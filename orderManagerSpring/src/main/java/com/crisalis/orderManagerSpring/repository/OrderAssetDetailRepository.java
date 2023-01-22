package com.crisalis.orderManagerSpring.repository;

import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderAssetDetailRepository extends JpaRepository<OrderAssetDetail, Integer> {
    Optional<List<OrderAssetDetail>> findByOrderId(Integer id_order);
}
