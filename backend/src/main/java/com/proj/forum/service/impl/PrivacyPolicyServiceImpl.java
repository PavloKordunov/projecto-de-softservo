package com.proj.forum.service.impl;

import com.proj.forum.dto.PrivacyPolicyDto;
import com.proj.forum.entity.PrivacyPolicy;
import com.proj.forum.repository.PrivacyPolicyRepository;
import com.proj.forum.service.PrivacyPolicyService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;


@Service
@Transactional
@RequiredArgsConstructor
public class PrivacyPolicyServiceImpl implements PrivacyPolicyService {

    private final PrivacyPolicyRepository privacyPolicyRepository;

    @Override
    public PrivacyPolicyDto getLatestPolicy() {
        return privacyPolicyRepository
                .findTopByOrderByIdDesc()
                .map(privacyPolicy -> PrivacyPolicyDto.builder()
                    .id(privacyPolicy.getId())
                    .policyContent(privacyPolicy.getPrivacyContent())
                    .version(privacyPolicy.getPrivacyContent())
                    .build())
                .orElseThrow(()-> new EntityNotFoundException("Privacy policy doesn't find"));
    }

    @Override
    public UUID createPrivacyPolicy(PrivacyPolicyDto privacyPolicyDto) {
        PrivacyPolicy privacyPolicy = PrivacyPolicy.builder()
                .privacyContent(privacyPolicyDto.policyContent())
                .version(privacyPolicyDto.version())
                .build();
        PrivacyPolicy policyFromDB = privacyPolicyRepository.save(privacyPolicy);
        return policyFromDB.getId();
    }

}
