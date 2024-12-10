package com.proj.forum.service;

import com.proj.forum.dto.GroupDto;

import java.util.List;
import java.util.UUID;

public interface GroupService {
    List<GroupDto> getAllGroups();
    UUID createGroup(GroupDto group);
    GroupDto getGroup(UUID id);

    void deleteGroup(UUID id);

    void updateGroup(UUID id, String title);
}
