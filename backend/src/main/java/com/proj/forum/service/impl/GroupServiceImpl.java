package com.proj.forum.service.impl;

import com.proj.forum.annotation.Logging;
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
    public UUID createGroup(GroupDto groupDto) {
        Group group = mapToGroup(groupDto);
        Group groupFromDB = groupRepository.save(group);
        return groupFromDB.getId();
    }

    @Override
    public GroupDto getGroup(UUID id) {
        Optional<Group> group;
        group = groupRepository.findById(id);
        if (group.isEmpty()) {
            throw new EntityNotFoundException("No group");
        }

        return GroupDto.builder()
                .id(id)
                .title(group.get().getTitle())
                .description(group.get().getDescription() == null ? StringUtils.EMPTY : group.get().getDescription())
                .build();
    }


    @Override
    public List<GroupDto> getAllGroups() {
        List<Group> groupList;
        groupList = groupRepository.findAll();
        if (groupList.isEmpty()) {
            throw new EntityNotFoundException("No groups");
        }

        return groupList.stream()
                .map(GroupServiceImpl::getUpdateGroup)
                .toList();
    }

    @Transactional
    @Override
    public void updateGroup(UUID id, GroupDto groupDto) {
        Group updatedGroup;
            updatedGroup = groupRepository.findById(id)
                    .map(group -> getUpdateGroup(group, groupDto))
                    .orElseThrow(() -> new EntityNotFoundException("Group is not found"));

            groupRepository.save(updatedGroup);
    }

    private Group getUpdateGroup(Group group, GroupDto groupDto) {
        if (!groupDto.title().equals(group.getTitle()))
            group.setTitle(groupDto.title());
        if (!groupDto.description().equals(group.getDescription()))
            group.setDescription(groupDto.description());
        return group;
    }

    @Override
    public void deleteGroup(UUID id) {
            if (groupRepository.existsById(id)) {
                groupRepository.deleteById(id);
            } else {
                throw new EntityNotFoundException("Group not found");
            }
    }


    private static Group mapToGroup(GroupDto groupDto) {
        return Group.builder()
                .title(groupDto.title())
                .description(groupDto.description() == null ? StringUtils.EMPTY : groupDto.description())
                .build();
    }

    private static GroupDto getUpdateGroup(Group group) {
        return GroupDto.builder()
                .id(group.getId())
                .title(group.getTitle())
                .description(group.getDescription() == null ? StringUtils.EMPTY : group.getDescription())
                .build();
    }

    @Override
    public List<GroupDto> mapToGroupDtoList(List<Group> groups) {
        return groups.stream()
                .map(group -> GroupDto.builder()
                        .id(group.getId())
                        .title(group.getTitle())
                        .description(group.getDescription() == null ? StringUtils.EMPTY : group.getDescription())
                        .build())
                .toList();
    }

    public List<GroupDto> getByTitleContain(String name) {
        return mapToGroupDtoList(groupRepository.findByTitleContainingIgnoreCase(name));
    }

}
