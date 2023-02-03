package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.UserDto;
import com.crisalis.orderManagerSpring.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    public UserDto saveUser(UserDto userDto);

    //public UserDto login(String userName, String password);
}
