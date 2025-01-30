package com.proj.forum.service;

import com.proj.forum.dto.PrivacyPolicyDto;

import java.util.UUID;

public interface PrivacyPolicyService {
    PrivacyPolicyDto getLatestPolicy();
    UUID createPrivacyPolicy(PrivacyPolicyDto privacyPolicyDto);
}
