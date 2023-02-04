package com.crisalis.orderManagerSpring.repository;

import com.crisalis.orderManagerSpring.model.CustomerAssetService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerAssetServiceRepository extends JpaRepository<CustomerAssetService, Integer> {

    List<CustomerAssetService> findByCompanyId (Integer id_company);

    List<CustomerAssetService> findByPersonId (Integer id_person);
}
