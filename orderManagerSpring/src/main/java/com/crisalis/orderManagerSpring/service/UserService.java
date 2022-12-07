package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.UserDto;
import com.crisalis.orderManagerSpring.model.User;

public interface UserService {

    public UserDto saveUser(UserDto userDto);

    //public UserDto login(String userName, String password);
}
