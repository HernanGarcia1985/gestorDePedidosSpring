package com.crisalis.orderManagerSpring.controller;

import com.crisalis.orderManagerSpring.dto.UserDto;
import com.crisalis.orderManagerSpring.exception.custom.CrudException;
import com.crisalis.orderManagerSpring.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    //public UserController(UserServiceImpl userServiceImpl){ this.userServiceImpl = userServiceImpl;}

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto) {
        System.out.println(userDto);
        try {
            return new ResponseEntity<>(userServiceImpl.saveUser(userDto), HttpStatus.CREATED);
        } catch (Exception exception) {
            throw new CrudException(HttpStatus.BAD_REQUEST, "Could not create resource");
            //exception.getMessage(),
        }
    }
    @GetMapping(value = "")
    public void saludo(){
        System.out.println("Saludo");
    }

/*    public UserDto login(@Valid @RequestBody String userName, String password){
        return this.userServiceImpl.login(userName, password);
    } */


}
