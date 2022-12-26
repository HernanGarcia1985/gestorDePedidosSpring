package com.crisalis.orderManagerSpring.repository;

import com.crisalis.orderManagerSpring.model.OwnService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<OwnService, Integer> {
}
