package com.crisalis.orderManagerSpring.repository;

import com.crisalis.orderManagerSpring.model.EnumRole;
import com.crisalis.orderManagerSpring.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    public Optional<Role> findByName(EnumRole name);
}
