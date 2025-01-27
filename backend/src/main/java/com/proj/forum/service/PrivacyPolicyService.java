package com.proj.forum.service;

import com.proj.forum.dto.PrivacyPolicyDto;

public interface PrivacyPolicyService {
    PrivacyPolicyDto getLatestPolicy();
    void createPrivacyPolicy(PrivacyPolicyDto privacyPolicyDto);
}
