package com.proj.forum.controller;

import com.proj.forum.annotation.Logging;
import com.proj.forum.annotation.RequireRoles;
import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.PrivacyPolicyDto;
import com.proj.forum.enums.RoleType;
import com.proj.forum.service.PrivacyPolicyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@Logging
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/policy")
@CrossOrigin("https://localhost:3000")
public class PrivacyPolicyController {

    private final PrivacyPolicyService privacyPolicyService;

    @RequireRoles({RoleType.ADMIN})
    @PostMapping("/create")
    public ApiResponse<GenericResponse> createPolicy(@RequestBody @Valid PrivacyPolicyDto policyDto) {
        UUID id = privacyPolicyService.createPrivacyPolicy(policyDto);
        return ApiResponse.apiResponse(true, 201, "Create privacy policy", id);
    }

    @GetMapping
    public ApiResponse<PrivacyPolicyDto> getLatestPrivacyPolicy() {
        PrivacyPolicyDto policyDto = privacyPolicyService.getLatestPolicy();
        return new ApiResponse<>(true, HttpStatusCode.valueOf(200), "Successful getting", policyDto);
    }
}
