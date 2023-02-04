package com.crisalis.orderManagerSpring.repository;

import com.crisalis.orderManagerSpring.model.CustomerAssetService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerAssetServiceRepository extends JpaRepository<CustomerAssetService, Integer> {
}
