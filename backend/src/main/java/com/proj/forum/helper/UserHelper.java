package com.proj.forum.helper;

import java.util.UUID;

public class UserHelper {

    public static String createNickname(String email) {
        String username = email.split("@")[0];
        String randomNumber = UUID.randomUUID().toString();
        return username + randomNumber.substring(0, 5);
    }
}
