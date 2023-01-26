package com.crisalis.orderManagerSpring.controller;

import com.crisalis.orderManagerSpring.dto.OrderCreateDto;
import com.crisalis.orderManagerSpring.dto.OrderDetailDto;
import com.crisalis.orderManagerSpring.service.impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    OrderServiceImpl orderServiceImpl;
    @PostMapping(value = "" , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createOrder (@RequestBody OrderCreateDto orderCreateDto) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(orderServiceImpl.createOrder(orderCreateDto));
    }

    @GetMapping(value = "/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOrderById(@PathVariable(value = "id") Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(orderServiceImpl.getOrderById(id));
    }

    @GetMapping(value = "" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllOrders(){
        List<OrderDetailDto> orderDetailDtoList = orderServiceImpl.getAllOrders();
        if (orderDetailDtoList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No orders found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(orderDetailDtoList);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> annulOrder(@PathVariable(value = "id") Integer id){
        orderServiceImpl.annulOrderById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Order with id "+id+" was annulled successfully!");
    }
}
