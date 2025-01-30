//package com.proj.forum.controller;
//
//import com.okta.sdk.resource.api.UserApi;
//import com.okta.sdk.resource.client.ApiClient;
//import com.okta.sdk.resource.model.User;
//import com.okta.sdk.resource.user.UserBuilder;
//import com.proj.forum.dto.ApiResponse;
//import com.proj.forum.dto.GenericResponse;
//import com.proj.forum.dto.UserDto;
//import com.proj.forum.service.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.oidc.user.OidcUser;
//import org.springframework.security.oauth2.jwt.JwtDecoder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Arrays;
//import java.util.UUID;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/register")
//@CrossOrigin("localhost:3000")
//public class RegisterController {
//
//    private final UserService userService;
//
//    @PostMapping
//    public ApiResponse<GenericResponse> registerUser(@AuthenticationPrincipal OidcUser user){
//        UserDto userDto;
//        try{
//
//        }
//        userService.createUser()
//
//    }
//
//}
