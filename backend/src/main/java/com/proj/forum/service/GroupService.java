package com.proj.forum.service;

import com.proj.forum.dto.GroupDto;

import java.util.List;

public interface GroupService {
    List<GroupDto> getAllGroups();
    GroupDto createGroup(GroupDto group);
}
