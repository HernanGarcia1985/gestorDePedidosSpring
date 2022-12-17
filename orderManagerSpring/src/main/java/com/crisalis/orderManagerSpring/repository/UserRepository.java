package com.crisalis.orderManagerSpring.repository;


import com.crisalis.orderManagerSpring.dto.UserDto;
import com.crisalis.orderManagerSpring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByEmail(String email); //Optional

    public Optional<User> findByUsername(String username);
    public Boolean existsByEmail(String email);

    public Boolean existsByUsername(String userName);

    public List<User> findAll();

    //User saveUser(User user);
}
