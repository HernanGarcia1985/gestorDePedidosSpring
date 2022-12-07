package com.crisalis.orderManagerSpring.service.impl;


import com.crisalis.orderManagerSpring.dto.UserDto;
import com.crisalis.orderManagerSpring.model.User;
import com.crisalis.orderManagerSpring.repository.UserRepository;
import com.crisalis.orderManagerSpring.service.UserService;
import com.crisalis.orderManagerSpring.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    //public UserServiceImpl(UserRepository userRepository){ this.userRepository = userRepository; }


    @Autowired
    private UserMapper userMapper;


    //public UserServiceImpl(UserMapper userMapper) { this.userMapper = userMapper;}

    @Override
    public UserDto saveUser(UserDto userDto){
        //if(StringUtils.isEmpty());
        if (userRepository.existsByEmail(userDto.getEmail())) {
            return null;
        }
        else {
            User user = userMapper.toEntity(userDto);
            User userNew = userRepository.save(user);
            return userMapper.toDto(userNew);
        }
    }

    /*@Override
    public UserDto login (String userName, String password) {

    }
    */

}
