package dev.salyem.cv.repository;

import dev.salyem.cv.entity.Strength;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StrengthRepository extends JpaRepository<Strength, Integer> {
    List<Strength> findAllByOrderBySortOrderAsc();
}
