package com.crisalis.orderManagerSpring.controller;

import com.crisalis.orderManagerSpring.dto.OrderDto;
import com.crisalis.orderManagerSpring.service.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    OrderServiceImpl orderServiceImpl;
    @PostMapping(value = "" , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createOrder (@RequestBody OrderDto orderDto) {
        try{
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(orderServiceImpl.createOrder(orderDto));
        } catch (Exception exception){
            throw new RuntimeException();
        }
    }
}
