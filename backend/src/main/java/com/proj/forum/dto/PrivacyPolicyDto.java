package com.proj.forum.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.util.UUID;

@Builder
public record PrivacyPolicyDto(
       UUID id,
       @NotEmpty String version,
       @NotEmpty String policyContent
       //@NotEmpty Boolean isAccepted //TODO Must it be?!
        ) {}
