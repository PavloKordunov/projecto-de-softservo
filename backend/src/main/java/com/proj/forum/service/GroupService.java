package com.proj.forum.service;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;

import java.util.List;
import java.util.UUID;

public interface GroupService {
    List<GroupDto> getAllGroups();
    UUID createGroup(GroupDto group);
    GroupDto getGroup(UUID id);
    void deleteGroup(UUID id);
    void updateGroup(UUID id, GroupDto groupDto);
    List<GroupDto> mapToGroupDtoList(List<Group> groups);
    List<GroupDto> getByTitleContain(String name);
}
