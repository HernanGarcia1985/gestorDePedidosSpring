package com.crisalis.orderManagerSpring.service.mapper;

import com.crisalis.orderManagerSpring.dto.UserDto;
import com.crisalis.orderManagerSpring.model.EnumRole;
import com.crisalis.orderManagerSpring.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.crisalis.orderManagerSpring.repository.RoleRepository;



@Component
public class UserMapper {

    @Autowired
    private RoleRepository roleRepository;
    public UserDto toDto(User user){
        return UserDto.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                //.id_roles(roleRepository.findById(user.getRole().getId()))
                .build();
    }

    public User toEntity(UserDto userDto){
        return User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                //.role(roleRepository.findByName(EnumRole.COMMON)
                //        .orElseThrow(() -> new RuntimeException("Error: Role is not found.")))
                .build();
    }
}
