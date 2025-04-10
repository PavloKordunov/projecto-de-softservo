package com.proj.forum.helper;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.UUID;

public class UserHelper {

    public static String createNickname(String email) {
        String username = email.split("@")[0];
        String randomNumber = UUID.randomUUID().toString();
        return username + randomNumber.substring(0, 5);
    }

    public static String getEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof JwtAuthenticationToken token)) {
            return null;
        }
        var jwt = (Jwt) token.getPrincipal();
        return jwt.getClaims().get("sub").toString();
    }
}
