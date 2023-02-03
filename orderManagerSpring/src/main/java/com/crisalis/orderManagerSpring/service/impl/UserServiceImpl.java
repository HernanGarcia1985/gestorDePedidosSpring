package com.crisalis.orderManagerSpring.service.impl;


import com.crisalis.orderManagerSpring.dto.JwtResponseDto;
import com.crisalis.orderManagerSpring.dto.UserDto;
import com.crisalis.orderManagerSpring.dto.UserLoginDto;
import com.crisalis.orderManagerSpring.dto.UserRegisterDto;
import com.crisalis.orderManagerSpring.exception.custom.CrudException;
import com.crisalis.orderManagerSpring.model.EnumRole;
import com.crisalis.orderManagerSpring.model.Role;
import com.crisalis.orderManagerSpring.model.User;
import com.crisalis.orderManagerSpring.repository.UserRepository;
import com.crisalis.orderManagerSpring.security.jwt.JwtUtils;
import com.crisalis.orderManagerSpring.service.UserService;
import com.crisalis.orderManagerSpring.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService { //UserDetailsService

    @Autowired
    private UserRepository userRepository;

    //public UserServiceImpl(UserRepository userRepository){ this.userRepository = userRepository; }

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private UserMapper userMapper;

    //public UserServiceImpl(UserMapper userMapper) { this.userMapper = userMapper;}

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Override
    public UserDto saveUser(UserDto userDto){
        //if(StringUtils.isEmpty());
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new CrudException(HttpStatus.BAD_REQUEST, "User already exits");
        }
        User user = userMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        User userNew = userRepository.save(user);
        return userMapper.toDto(userNew);

    }

    /*public void saveUser (UserRegisterDto signUpRequest){

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account

        User user = new User(signUpRequest.getEmail(),
                signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword())
        );

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(EnumRole.COMMON)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);
    }*/

    public JwtResponseDto authUser(UserLoginDto loginRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new JwtResponseDto(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles);


    }

}
