package com.proj.forum.service.impl;

import com.proj.forum.entity.Group;
import com.proj.forum.entity.Tag;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.repository.TagRepository;
import com.proj.forum.service.GroupService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
public class GroupServiceImpl implements GroupService {

    private GroupRepository groupRepository;

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository) {this.groupRepository = groupRepository;}

    @Override
    public List<Group> getAllGroups(){
        Iterable<Group> all = groupRepository.findAll();
        log.info("getAllGroups");
        return List.of(all.iterator().next());
    };

}
