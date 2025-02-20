package com.proj.forum.helper;

import java.util.Random;

public class UserHelper {

    public static String createNickname(String email) {
        String username = email.split("@")[0];
        int randomNumber = new Random().nextInt(1000, 9999);
        return username + randomNumber;
    }
}
