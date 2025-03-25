package com.proj.forum.repository;

import com.proj.forum.entity.Statistic;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserStatisticRepository extends JpaRepository<Statistic, UUID> {
    //List<Statistic> findByUserId(@NotNull UUID userId);

    boolean existsByObjectIdAndUserId(@NotNull UUID objectId, @NotNull UUID userId);

    Optional<Statistic> getStatisticByObjectIdAndUserId(@NotNull UUID objectId, @NotNull UUID userId);
}
