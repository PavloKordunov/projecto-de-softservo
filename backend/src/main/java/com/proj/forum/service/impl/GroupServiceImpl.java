package com.proj.forum.service.impl;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.service.GroupService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;

    @Override
    public GroupDto createGroup(GroupDto groupDto) {
        log.info("Creating group in service");
        Group group = getGroup(groupDto);
        Group groupFromDB = groupRepository.save(group);
        return getGroupDto(groupFromDB);
    }

    @Override
    public GroupDto getGroup(UUID id) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isEmpty()) {
            log.info("No group");
            return null;
        }

        return GroupDto.builder()
                .id(id)
                .title(group.get().getTitle())
                .description(group.get().getDescription() == null ? StringUtils.EMPTY : group.get().getDescription())
                .build();
    }


    @Override
    public List<GroupDto> getAllGroups() {
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

    @Transactional
    @Override
    public GroupDto updateGroup(UUID id, GroupDto groupDto) {
        log.info("Update group by put");
        groupRepository.findById(id).ifPresent(group -> getGroupDto(groupDto, group));

        return groupDto;  // TODO fix return
    }

    private GroupDto getGroupDto(GroupDto groupDto, Group group) {
        group.setTitle(groupDto.title());
        group.setDescription(groupDto.description());
        return groupDto;
    }

    @Override
    public void deleteGroup(UUID id) {
        if (groupRepository.existsById(id)) {
            groupRepository.deleteById(id);
        } else {
            log.error("Not found group");
            //TODO throw new custom ex
        }
    }


    private static Group getGroup(GroupDto groupDto) {
        if (groupDto == null) {
            log.error("Group is null");
            throw new NullPointerException();
        }
//        log.info("Creating group from groupDto");

        return Group.builder()
                .title(groupDto.title())
                .description(groupDto.description() == null ? StringUtils.EMPTY : groupDto.description())
                .build();
    }

    private static GroupDto getGroupDto(Group group) {
        if (group == null) {
            log.info("no group found");
            throw new EntityNotFoundException("no group found");
        }
//        log.info("Creating groupDto from group");

        return GroupDto.builder()
                .id(group.getId())
                .title(group.getTitle())
                .description(group.getDescription() == null ? StringUtils.EMPTY : group.getDescription())
                .build();
    }


}
