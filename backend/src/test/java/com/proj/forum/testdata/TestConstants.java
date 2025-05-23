package com.proj.forum.testdata;

import lombok.experimental.UtilityClass;

import java.time.LocalDateTime;
import java.util.UUID;

@UtilityClass
public class TestConstants {
    //User
    public static final UUID userId = UUID.randomUUID();
    public static final String username = "testUser";
    public static final String nameOfUser = "Test User";
    public static final String email = "test@example.com";
    public static final String profileImage = "user-profile-url";

    //Group
    public static final UUID groupId = UUID.randomUUID();
    public static final String titleGroup = "Test Group";
    public static final String descriptionGroup = "Test Group Description";
    public static final boolean isPublic = true;
    public static final UUID authorId = UUID.randomUUID();


    //PostDto
    public static final String titlePostDto = "Test Title";
    public static final String descriptionPostDto = "Test Post Description";
    public static final String imagePostDto = "post-image-url";

    //Post
    public static final UUID postId = UUID.randomUUID();
    public static final String titlePost = "Test Title";
    public static final String descriptionPost = "Test Post Description";
    public static final String imagePost = "post-image-url";
    public static final LocalDateTime createdAt = LocalDateTime.now();
    public static final int counterPost = 0;

    //UserDto
    public static final String nicknameUserDto = "Test Nickname";
    public static final String nameUserDto = "Test name";
    public static final String emailUserDto = "Test email";
    public static final String profileImageUserDto = "Test profile image";

    //UserUpdateDto
    public static final String nicknameUserUpdate = "New nickname";
    public static final String nameUserUpdate = "New name";
    public static final String profileImageUserUpdate = "New profile image";

    //followedUser
    public static final UUID followedId = UUID.randomUUID();
    public static final String nicknameFollowed = "Followed nickname";
    public static final String nameFollowed = "Followed name";
    public static final String emailFollowed = "Followed email";
    public static final String profileImageFollowed = "Followed profile image";
    //Tag
    public static final UUID tagId = UUID.randomUUID();

    //Search
    public static final String subtitlePost = "Test";

}
