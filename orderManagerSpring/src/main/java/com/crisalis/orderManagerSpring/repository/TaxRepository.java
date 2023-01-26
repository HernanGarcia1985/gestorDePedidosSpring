package com.crisalis.orderManagerSpring.repository;

import com.crisalis.orderManagerSpring.model.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaxRepository extends JpaRepository<Tax,Integer> {
    boolean existsByName(String name);
}
