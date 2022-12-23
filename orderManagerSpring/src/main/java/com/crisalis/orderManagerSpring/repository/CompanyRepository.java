package com.crisalis.orderManagerSpring.repository;

import com.crisalis.orderManagerSpring.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Optional<Company> findById(Integer id);

}
