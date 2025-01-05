package com.proj.forum.repository;

import com.proj.forum.entity.PrivacyPolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PrivacyPolicyRepository extends JpaRepository<PrivacyPolicy, UUID> {
    Optional<PrivacyPolicy> findTopByOrderByIdDesc();
}
