package com.proj.forum.strategy;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class GroupMapper implements Mapper<Group, GroupDto> {

    @Override
    public GroupDto mapToDto(Group group) {
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
                .build();
    }

    @Override
    public Group mapToEntity(GroupDto groupDto) {
        return Group.builder()
                .author(groupDto.userId())
                .title(groupDto.title())
                .image(groupDto.image() == null ? StringUtils.EMPTY : groupDto.image())
                .description(groupDto.description())
                .members(new ArrayList<>())
                .isPublic(groupDto.isPublic())
                .build();
    }
}
