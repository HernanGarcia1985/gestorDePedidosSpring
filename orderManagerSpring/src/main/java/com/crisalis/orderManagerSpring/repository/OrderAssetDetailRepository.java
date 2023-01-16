package com.crisalis.orderManagerSpring.repository;

import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderAssetDetailRepository extends JpaRepository<OrderAssetDetail, Integer> {
}
