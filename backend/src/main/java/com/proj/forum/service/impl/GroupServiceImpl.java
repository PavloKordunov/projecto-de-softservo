package com.proj.forum.service.impl;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.User;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.GroupService;
import com.proj.forum.strategy.GroupCustomMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;


@Slf4j
@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupCustomMapper groupMapper;

    @Override
    public UUID createGroup(GroupDto groupDto) {
        Group group = groupMapper.mapToEntity(groupDto);
        group.getMembers().add(userRepository.findById(groupDto.userId()).orElseThrow(
                () -> new EntityNotFoundException("Member not found")));
        Group groupFromDB = groupRepository.save(group);
        return groupFromDB.getId();
    }

    @Override
    public GroupDto getGroup(UUID id) {
        Group group = groupRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Group not found"));
        return groupMapper.mapToDto(group);
    }

    @Override
    public List<GroupDto> getAllGroups() {
        List<Group> groupList = groupRepository.findAll();
        if (groupList.isEmpty()) {
            throw new EntityNotFoundException("Group not found");
        }

        return mapToGroupDtoList(groupList);
    }

    @Override
    public void updateGroup(UUID id, GroupDto groupDto) throws AccessDeniedException {
        Group updatedGroup = groupRepository.findById(id)
                .map(group -> getUpdateGroup(group, groupDto))
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));
        if (updatedGroup.getAuthor() != id)
            throw new AccessDeniedException("No permission");
        groupRepository.save(updatedGroup);
    }

    @Override
    public void deleteGroup(UUID groupId, UUID userId) throws AccessDeniedException {
        boolean equalityByUserId = groupRepository.findById(groupId).orElseThrow(
                () -> new EntityNotFoundException("Group not found")).getAuthor().equals(userId);
        if (!equalityByUserId) {
            throw new AccessDeniedException("User has no permission");
        }
        groupRepository.deleteById(groupId);
    }

    @Override
    public List<GroupDto> getByTitleContain(String name) {
        return mapToGroupDtoList(groupRepository.findByTitleContainingIgnoreCase(name));
    }

    @Override
    public boolean addMember(UUID userId, String groupName) {
        Group group = groupRepository.findByTitle(groupName)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (group.getMembers().contains(user)) {
            group.getMembers().remove(user);
            user.getGroups().remove(group);
            groupRepository.save(group);
            userRepository.save(user);
            return false;
        } else {
            group.getMembers().add(user);
            user.getGroups().add(group);
            groupRepository.save(group);
            userRepository.save(user);
            return true;
        }
    }

    @Override
    public List<GroupDto> getFollowedGroups(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return mapToGroupDtoList(groupRepository.findByMembersContains(user));
    }

    @Override
    public List<GroupDto> mapToGroupDtoList(List<Group> groups) {
        return groups.stream()
                .map(groupMapper::mapToDto)
                .toList();
    }

    private Group getUpdateGroup(Group group, GroupDto groupDto) {
        if (!groupDto.title().equals(group.getTitle()))
            group.setTitle(groupDto.title());
        if (!groupDto.description().equals(group.getDescription()))
            group.setDescription(groupDto.description());
        if (!groupDto.image().equals(group.getImage()))
            group.setImage(groupDto.image());
        return group;
    }
}
