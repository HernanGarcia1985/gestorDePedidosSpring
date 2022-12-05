package com.crisalis.orderManagerSpring.repository;


import com.crisalis.orderManagerSpring.dto.UserDto;
import com.crisalis.orderManagerSpring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    List<User> findAll();

    User saveUser(User user);
}
