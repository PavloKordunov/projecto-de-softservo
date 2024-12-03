package com.proj.forum.service.impl;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.service.GroupService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;

    @Override
    public List<GroupDto> getAllGroups(){
        List<Group> groupList = groupRepository.findAll();
        log.info("getAllGroups");


//        // Mock response data
//        List<Group> group = new ArrayList<>();
//
//        group.add(Group.builder()
//                .id(groupList.iterator().next().getId())
//                .title("Group A")
//                .description("Description for Group A")
//                .build());
//
//        group.add(Group.builder()
//                .id(UUID.randomUUID())
//                .title("Group B")
//                .description("Description for Group B")
//                .build());

        return groupList.stream()
                .map(GroupServiceImpl::getGroupDto)
                .toList();
    }

    private static GroupDto getGroupDto(Group group) {
        if (group == null) {
            log.info("no group found");
            throw new EntityNotFoundException("no group found");
        }

        return GroupDto.builder()
                .id(group.getId())
                .title(group.getTitle())
                .description(group.getDescription() == null ? StringUtils.EMPTY : group.getDescription())
                .build();
    }

    ;

}
