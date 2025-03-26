package com.proj.forum.service.impl;

import com.proj.forum.dto.CommentDto;
import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.dto.PostResponseDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.Statistic;
import com.proj.forum.entity.User;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.repository.PostRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.repository.UserStatisticRepository;
import com.proj.forum.service.CommentService;
import com.proj.forum.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final UserStatisticRepository userStatisticRepository;
    private final CommentService commentService;

    @Override
    public UUID createPost(PostRequestDto postDto) {
        Group group = groupRepository.findById(postDto.groupId()).orElseThrow(
                () -> new EntityNotFoundException("Group not found"));
        User user = userRepository.findById(postDto.userId()).orElseThrow(
                () -> new EntityNotFoundException("User not found"));
        if (!user.getGroups().contains(group)) {
            throw new EntityNotFoundException("User is not in the group");
        }
        Post post = mapToPost(postDto, user, group);
        Post postFromDB = postRepository.save(post);
        return postFromDB.getId();
    }

    @Override
    public List<PostResponseDto> getAllPosts() {
        List<Post> postList = postRepository.findAll();
        return getPostResponseDtos(postList);
    }


    @Override
    public PostResponseDto getPostById(UUID id) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Post not found"));

        String email = getEmail();
        Integer countLikes = getCountLikes(post);
        Integer countSaved = getCountSaved(post);
        if(email == null) {
            return stickPostDtoAndStatistic(post, null, countLikes, countSaved);
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new EntityNotFoundException("User not found"));
        Statistic statistic = userStatisticRepository.getStatisticByObjectIdAndUserId(id, user.getId()).orElse(null);
        return stickPostDtoAndStatistic(post, statistic, countLikes, countSaved);
    }

    @Override
    public List<PostResponseDto> getPostsByUser(UUID userId) {
        List<Post> postList = postRepository.findAllByAuthor_Id(userId);
        if (postList.isEmpty()) {
            throw new EntityNotFoundException("Posts not found");
        }
        return mapToPostDtoList(postList);
    }

    @Override
    public List<PostResponseDto> getPostsByGroup(UUID groupId) {
        List<Post> postList = postRepository.findAllByGroup_Id(groupId);
        return getPostResponseDtos(postList);
    }

    @Override
    public void updatePost(UUID postId, PostRequestDto postDto) {
        Post updatedPost = postRepository.findById(postId)
                .map(post -> getUpdatePost(post, postDto))
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        postRepository.save(updatedPost);
    }

    @Override
    public boolean pinPost(UUID postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        post.setPinned(!post.isPinned());
        postRepository.save(post);
        return post.isPinned();
    }

    @Override
    public void deletePost(UUID id) {
        postRepository.deleteById(id);
    }

    @Override
    public List<PostResponseDto> getByTitleContain(String name) {
        return mapToPostDtoList(postRepository.findByTitleContainingIgnoreCase(name));
    }

    @Override
    public void addView(UUID id) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Post not found"));
        post.setViewCount((post.getViewCount()) + 1);   //maybe should save explicit
    }

    @Override
    public void isAuthor(UUID postId, UUID userId) throws AccessDeniedException {
        if (!postRepository.findById(postId)
                .map(Post::getAuthor)
                .map(User::getId)
                .map(id -> id.equals(userId))
                .orElse(false)) {
            throw new AccessDeniedException("User is not the author of this post.");
        }
    }

    @Override
    public List<PostResponseDto> getUserPosts(UUID userId, String sort, String order) {
        Sort.Direction direction = order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

        Sort sortBy;
        if ("views".equals(sort)) {
            sortBy = Sort.by(direction, "views");
            List<Post> result = postRepository.findAllByAuthor_Id(userId, sortBy);
            return mapToPostDtoList(result);
        } else if ("createdAt".equals(sort)){
            sortBy = Sort.by(direction, "createdAt");
            List<Post> result = postRepository.findAllByAuthor_Id(userId, sortBy);
            return mapToPostDtoList(result);
        }

        List<Post> posts = postRepository.findAllByAuthor_Id(userId);

        if ("likes".equals(sort)) {

            for (Post post : posts) {
                Integer totalLikes = userStatisticRepository.getTotalLikes(post.getId());

                post.setLikesCount(totalLikes);
                postRepository.save(posts.getFirst());
            }
            posts.sort(order.equalsIgnoreCase("asc") ?
                    Comparator.comparing(Post::getLikesCount) :
                    Comparator.comparing(Post::getLikesCount).reversed());
        }

        return mapToPostDtoList(posts);
    }

private List<PostResponseDto> getPostResponseDtos(List<Post> postList) {
    if (postList.isEmpty()) {
        throw new EntityNotFoundException("Posts not found");
    }

    List<PostResponseDto> postDtoList = new ArrayList<>();
    String email = getEmail();

    if (email == null) {
        for (Post post : postList){
            Integer countLikes = getCountLikes(post);
            Integer countSaved = getCountSaved(post);
            postDtoList.add(stickPostDtoAndStatistic(post, null, countLikes, countSaved));
        }
        return postDtoList;
    }
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
    for (Post post : postList) {
        Statistic statistic = userStatisticRepository.getStatisticByObjectIdAndUserId(post.getId(), user.getId()).orElse(null);

        Integer countLikes = getCountLikes(post);
        Integer countSaved = getCountSaved(post);
        postDtoList.add(stickPostDtoAndStatistic(post, statistic, countLikes, countSaved));
    }
    return postDtoList;
}

    private Integer getCountLikes(Post post) {
        int countLike = 0;
        List<Statistic> statistics = userStatisticRepository.findStatisticsByObjectIdAndLikedIsTrue(post.getId());
        if(!statistics.isEmpty())
            countLike = statistics.size();
        return countLike;
    }

    private Integer getCountSaved(Post post) {
        int countSaved = 0;
        List<Statistic> statistics = userStatisticRepository.findStatisticsByObjectIdAndSavedIsTrue(post.getId());
        if(!statistics.isEmpty())
            countSaved = statistics.size();
        return countSaved;
    }

    private Post getUpdatePost(Post post, PostRequestDto postDto) {
        if (postDto.title() != null)
            post.setTitle(postDto.title());
        if (postDto.description() != null)
            post.setDescription(postDto.description());
        if (postDto.image() != null)
            post.setImage(postDto.image());
        return post;
    }

    private static Post mapToPost(PostRequestDto postDto, User user, Group group) {
        return Post.builder()
                .title(postDto.title())
                .description(postDto.description() == null ? StringUtils.EMPTY : postDto.description())
                .image(postDto.image())
                .author(user)
                .group(group)
                .isPinned(false)
                .createdAt(LocalDateTime.now())
                .viewCount(0)
                .build();
    }

    private PostResponseDto stickPostDtoAndStatistic(Post post, Statistic statistic,
                                                     Integer countLikes, Integer countSaved) {

        List<CommentDto> comments = commentService.mapToListOfCommentsDto(post.getComments());
        return PostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription() == null ? StringUtils.EMPTY : post.getDescription())
                .image(post.getImage() == null ? StringUtils.EMPTY : post.getImage())
                .userImage(post.getAuthor().getProfileImage())
                .nickname(post.getAuthor().getUsername())
                .name(post.getAuthor().getName())
                .isPinned(post.isPinned())
                .groupTitle(post.getGroup().getTitle())
                .createdAt(post.getCreatedAt())
                .viewCount(post.getViewCount())
                .comments(comments)
                .userId(post.getAuthor().getId())
                .groupId(post.getGroup().getId())
                .isLiked(statistic == null ? null: statistic.getLiked())
                .isSaved(statistic == null ? false: statistic.getSaved())
                .countLikes(countLikes)
                .countSaved(countSaved)
                .build();
    }

    @Override
    public List<PostResponseDto> mapToPostDtoList(List<Post> posts) {
        return posts.stream()
                .map(this::getUpdatePost)
                .toList();

    }

    private String getEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof JwtAuthenticationToken token)) {
            return null;
        }
        var jwt = (Jwt) token.getPrincipal();
        return jwt.getClaims().get("sub").toString();
    }

    private PostResponseDto getUpdatePost(Post post) {
        List<CommentDto> comments = commentService.mapToListOfCommentsDto(post.getComments());

        return PostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription() == null ? StringUtils.EMPTY : post.getDescription())
                .image(post.getImage() == null ? StringUtils.EMPTY : post.getImage())
                .userImage(post.getAuthor().getProfileImage())
                .nickname(post.getAuthor().getUsername())
                .name(post.getAuthor().getName())
                .isPinned(post.isPinned())
                .groupTitle(post.getGroup().getTitle())
                .createdAt(post.getCreatedAt())
                .viewCount(post.getViewCount())
                .countLikes(post.getLikesCount())
                .comments(comments)
                .userId(post.getAuthor().getId())
                .groupId(post.getGroup().getId())
                .isSaved(false)
                .isLiked(null)
                .build();
    }
}

