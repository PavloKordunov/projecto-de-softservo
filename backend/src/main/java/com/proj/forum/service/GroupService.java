package com.proj.forum.service;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

public interface GroupService {
    List<GroupDto> getAllGroups();
    UUID createGroup(GroupDto group);
    GroupDto getGroup(UUID id);
    void deleteGroup(UUID groupId, UUID userId) throws AccessDeniedException;
    void updateGroup(UUID id, GroupDto groupDto) throws AccessDeniedException;
    List<GroupDto> mapToGroupDtoList(List<Group> groups);
    List<GroupDto> getByTitleContain(String name);
    boolean addMember(UUID userId, String groupName);
    List<GroupDto> getFollowedGroups(UUID userId);
    //UUID removeMember(UUID userId, String groupName);
}
