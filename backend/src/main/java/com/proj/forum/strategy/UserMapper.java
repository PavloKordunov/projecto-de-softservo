package com.proj.forum.strategy;

import com.proj.forum.dto.UserDto;
import com.proj.forum.entity.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Mapper<User, UserDto> {
    @Override
    public User mapToEntity(UserDto userDto) {
        return User.builder()
                .name(userDto.firstName())
                .username(userDto.nickName() == null ? StringUtils.EMPTY : userDto.nickName())
                .email(userDto.email() == null ? StringUtils.EMPTY : userDto.email())
                .profileImage(userDto.profileImage() == null ? StringUtils.EMPTY : userDto.profileImage())
                .build();
    }

    @Override
    public UserDto mapToDto(User user){
        return UserDto.builder()
                .id(user.getId())
                .nickName(user.getUsername()) //TODO remind ui about change
                .firstName(user.getName())
                .following(user.getFollowing().size())
                .subscribers(user.getSubscribers().size())
                .followingGroups(user.getCreatedGroups().size())
                .createdPosts(user.getCreatedPosts().size())
                .profileImage(user.getProfileImage() == null ? StringUtils.EMPTY : user.getProfileImage())
                .email(user.getEmail() == null ? StringUtils.EMPTY : user.getEmail())
                .build();
    }
}
