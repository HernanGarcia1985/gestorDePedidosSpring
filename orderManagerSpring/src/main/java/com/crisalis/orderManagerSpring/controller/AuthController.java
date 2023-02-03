package com.crisalis.orderManagerSpring.controller;

import com.crisalis.orderManagerSpring.dto.JwtResponseDto;
import com.crisalis.orderManagerSpring.dto.UserLoginDto;
import com.crisalis.orderManagerSpring.dto.UserRegisterDto;
import com.crisalis.orderManagerSpring.exception.custom.UnauthorizatedException;
import com.crisalis.orderManagerSpring.model.EnumRole;
import com.crisalis.orderManagerSpring.model.Role;
import com.crisalis.orderManagerSpring.model.User;
import com.crisalis.orderManagerSpring.repository.RoleRepository;
import com.crisalis.orderManagerSpring.repository.UserRepository;
import com.crisalis.orderManagerSpring.security.jwt.JwtUtils;
import com.crisalis.orderManagerSpring.service.impl.UserDetailsImpl;
import com.crisalis.orderManagerSpring.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    //@Autowired
    //AuthenticationManager authenticationManager;

    @Autowired
    UserServiceImpl userServiceImpl;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    //@Autowired
    //JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserLoginDto loginRequest) {

        try {
            return new ResponseEntity<>(userServiceImpl.authUser(loginRequest), HttpStatus.OK);
        } catch (Exception exception) {
            throw new UnauthorizatedException("Bad Credentials");
            //exception.getMessage(),
        }

        /*Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDto(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));*/
    }

    @PostMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterDto signUpRequest) {

        /*try {
            return new ResponseEntity<>(userServiceImpl.saveUser(signUpRequest), HttpStatus.CREATED);
        } catch (Exception exception) {
            throw new CrudException(HttpStatus.BAD_REQUEST, "Resource cannot be created");
            //exception.getMessage(),
        }*/

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

        return ResponseEntity.ok("User registered successfully!");
    }
}
