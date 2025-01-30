package com.proj.forum.controller;

import com.proj.forum.dto.ApiResponse;
import com.proj.forum.dto.GenericResponse;
import com.proj.forum.dto.PrivacyPolicyDto;
import com.proj.forum.service.PrivacyPolicyService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/policy")
@CrossOrigin("http://localhost:3000")
public class PrivacyPolicyController {

    private final PrivacyPolicyService privacyPolicyService;

    @PostMapping("/create")
    public ApiResponse<GenericResponse> createPolicy(@RequestBody @Valid PrivacyPolicyDto policyDto) {
        try{
            log.info("Create policy");
            UUID id = privacyPolicyService.createPrivacyPolicy(policyDto);

            return ApiResponse.apiResponse(true,201,"Create privacy policy",id);
        } catch (EntityNotFoundException ex){
            log.info("Privacy policy is null");
            throw ex;
        }
    }

    @GetMapping
    public ApiResponse<PrivacyPolicyDto> getLatestPrivacyPolicy() {

        log.info("Fetch latest privacy policy");
        PrivacyPolicyDto policyDto = privacyPolicyService.getLatestPolicy();

        return new ApiResponse<>(true, HttpStatusCode.valueOf(200),"Successful getting",policyDto);
    }
}
