package com.proj.forum.repository;

import com.proj.forum.entity.PrivacyPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PrivacyPolicyRepository extends JpaRepository<PrivacyPolicy, UUID> {
    Optional<PrivacyPolicy> findTopByOrderByIdDesc();
}
