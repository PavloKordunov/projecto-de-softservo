package com.proj.forum.strategy;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.dto.TagDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.Tag;
import com.proj.forum.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GroupCustomMapper implements CustomMapper<Group, GroupDto> {

    private final TagRepository tagRepository;

    @Override
    public GroupDto mapToDto(Group group) {
        List<TagDto> tags = group.getTags().stream()
                .map(tag -> TagDto.builder()
                        .name(tag.getName())
                        .id(tag.getId())
                        .build())
                .toList();

        return GroupDto.builder()
                .id(group.getId())
                .title(group.getTitle())
                .description(group.getDescription() == null ? StringUtils.EMPTY : group.getDescription())
                .image(group.getImage() == null ? StringUtils.EMPTY : group.getImage())
                .userId(group.getAuthor())
                .createdAt(group.getCreatedAt())
                .isPublic(group.isPublic())
                .memberCount(group.getMembers().size())
                .postCount(group.getPosts().size())
                .tagDtos(tags)
                .build();
    }

    @Override
    public Group mapToEntity(GroupDto groupDto) {
        List<Tag> tags;
        if(groupDto.tagsId() != null) {
            tags = tagRepository.findAllById(groupDto.tagsId());
        }
        else {
            tags = null;
        }
        return Group.builder()
                .author(groupDto.userId())
                .title(groupDto.title())
                .image(groupDto.image() == null ? StringUtils.EMPTY : groupDto.image())
                .description(groupDto.description())
                .members(new ArrayList<>())
                .isPublic(groupDto.isPublic())
                .tags(tags)
                .build();
    }
}
