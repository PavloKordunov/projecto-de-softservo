package com.proj.forum.testdata;

import com.proj.forum.dto.PostRequestDto;
import com.proj.forum.dto.UserDto;
import com.proj.forum.dto.UserUpdateDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.Post;
import com.proj.forum.entity.User;
import lombok.experimental.UtilityClass;

import static com.proj.forum.testdata.TestConstants.*;

import java.util.ArrayList;

@UtilityClass
public class TestEntity {
    public static PostRequestDto getPostRequestDto() {
        return PostRequestDto.builder()
                //.tagId(tagId)
                .title(titlePostDto)
                .userId(userId)
                .groupId(groupId)
                .description("Test Description")
                .image("test-image-url")
                .build();
    }

    public static UserDto getUserDto() {
        return UserDto.builder()
                .nickName(nicknameUserDto)
                .firstName(nameUserDto)
                .email(emailUserDto)
                .profileImage(profileImageUserDto)
                .build();
    }

    public static UserUpdateDto getUserUpdateDto() {
        return UserUpdateDto.builder()
                .nickName(nicknameUserUpdate)
                .firstName(nameUserUpdate)
                .profileImage(profileImageUserUpdate)
                .build();
    }

    public static User getUser() {
        return User.builder()
                .id(userId)
                .username(username)
                .email(email)
                .name(nameOfUser)
                .profileImage(profileImage)
                .groups(new ArrayList<>())
                .createdPosts(new ArrayList<>())
                .build();
    }

    public static User getFollowedUser(){
        return User.builder()
                .id(followedId)
                .username(nicknameFollowed)
                .name(nameFollowed)
                .email(emailFollowed)
                .profileImage(profileImageFollowed)
                .build();
    }

    public static Group getGroup() {
        return Group.builder()
                .id(groupId)
                .title(titleGroup)
                .description(descriptionGroup)
                .isPublic(isPublic)
                .author(authorId)
                .members(new ArrayList<>())
                .posts(new ArrayList<>())
                .build();
    }

    public static Post getPost() {
        return Post.builder()
                .id(postId)
                .title(titlePost)
                .description(descriptionPost)
                .image(imagePost)
                .createdAt(createdAt)
                .viewCount(counterPost)
                .build();
    }
}
