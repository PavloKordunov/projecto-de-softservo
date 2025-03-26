package com.proj.forum.repository;

import com.proj.forum.entity.Statistic;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserStatisticRepository extends JpaRepository<Statistic, UUID> {
    List<Statistic> findByUserId(@NotNull UUID userId);

    boolean existsByObjectIdAndUserId(@NotNull UUID objectId, @NotNull UUID userId);
    Optional<Statistic> getStatisticByObjectIdAndUserId(@NotNull UUID objectId, @NotNull UUID userId);

    List<Statistic> findStatisticsByObjectIdAndLikedIsTrue(UUID objectId);
    List<Statistic> findStatisticsByObjectIdAndSavedIsTrue(UUID objectId);

    Statistic getStatisticByUserIdAndObjectId(@NotNull UUID userId, @NotNull UUID objectId);

    @Query("SELECT " +
            "COALESCE(SUM(CASE WHEN s.liked = true THEN 1 ELSE 0 END), 0) - " +
            "COALESCE(SUM(CASE WHEN s.liked = false THEN 1 ELSE 0 END), 0) " +
            "FROM Statistic s WHERE s.objectId = :objectId")
    Integer getTotalLikes(@Param("objectId") UUID objectId);


}
