package com.proj.forum.service.impl;

import com.proj.forum.dto.GroupDto;
import com.proj.forum.entity.Group;
import com.proj.forum.entity.User;
import com.proj.forum.repository.GroupRepository;
import com.proj.forum.repository.UserRepository;
import com.proj.forum.service.GroupService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Slf4j
@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Override
    public UUID createGroup(GroupDto groupDto) {
        Group group = mapToGroup(groupDto);
        group.getMembers().add(userRepository.findById(groupDto.userId()).get());
        Group groupFromDB = groupRepository.save(group);
        return groupFromDB.getId();
    }

    @Override
    public GroupDto getGroup(UUID id) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isEmpty()) {
            throw new EntityNotFoundException("No group");
        }
        return getUpdateGroup(group.get());
    }

    @Override
    public List<GroupDto> getAllGroups() {
        List<Group> groupList = groupRepository.findAll();
        if (groupList.isEmpty()) {
            throw new EntityNotFoundException("No groups");
        }

        return groupList.stream()
                .map(GroupServiceImpl::getUpdateGroup)
                .toList();
    }

    @Override
    public void updateGroup(UUID id, GroupDto groupDto) throws AccessDeniedException {
        Group updatedGroup = groupRepository.findById(id)
                .map(group -> getUpdateGroup(group, groupDto))
                .orElseThrow(() -> new EntityNotFoundException("Group is not found"));
        if (updatedGroup.getAuthor() != id)
            throw new AccessDeniedException("No permission");
        groupRepository.save(updatedGroup);
    }

    @Override
    public void deleteGroup(UUID groupId, UUID userId) throws AccessDeniedException {
        if (!groupRepository.findById(groupId).get().getAuthor().equals(userId)) {
            throw new AccessDeniedException("User has no permission");
        }
        if (groupRepository.existsById(groupId)) {
            groupRepository.deleteById(groupId);
        } else {
            throw new EntityNotFoundException("Group not found");
        }
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
                .map(GroupServiceImpl::getUpdateGroup)
                .toList();
    }

    private static Group mapToGroup(GroupDto groupDto) {
        return Group.builder()
                .author(groupDto.userId())
                .title(groupDto.title())
                .image(groupDto.image() == null ? StringUtils.EMPTY : groupDto.image())
                .description(groupDto.description())
                .members(new ArrayList<>())
                .isPublic(groupDto.isPublic())
                .build();
    }

    private static GroupDto getUpdateGroup(Group group) {
        return GroupDto.builder()
                .id(group.getId())
                .title(group.getTitle())
                .description(group.getDescription() == null ? StringUtils.EMPTY : group.getDescription())
                .image(group.getImage() == null ? StringUtils.EMPTY : group.getImage())
                .userId(group.getAuthor())
                .createdAt(group.getCreatedAt())
                .isPublic(group.isPublic())
                .memberCount(group.getMembers().size())
                .postCount(group.getPosts().size())
                .build();
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
//    @Override
//    @Transactional
//    public UUID removeMember(UUID userId, String groupName) {
//        Group group = groupRepository.findByTitle(groupName).orElseThrow(() -> new EntityNotFoundException("Group is not found"));
//        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User is not found"));
//
//        if (!group.getMembers().contains(user)) {
//            throw new UserAlreadySubscribeException("User is not subscribed to group");
//        }
//        group.getMembers().remove(user);
//        groupRepository.save(group);
//        return group.getId();
//    }

}
