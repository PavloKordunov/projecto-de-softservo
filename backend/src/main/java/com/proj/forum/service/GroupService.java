package com.proj.forum.service;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;

import java.util.List;

public interface GroupService {
    List<GroupDto> getAllGroups();
}
