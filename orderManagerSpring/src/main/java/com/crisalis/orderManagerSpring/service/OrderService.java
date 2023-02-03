package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.OrderCreateDto;
import com.crisalis.orderManagerSpring.dto.OrderDetailDto;

import java.util.List;

public interface OrderService {

    OrderDetailDto createOrder (OrderCreateDto orderCreateDto);

    OrderDetailDto getOrderById(Integer id);

    List<OrderDetailDto> getAllOrders ();

    void annulOrderById(Integer id);

    OrderDetailDto validateOrder(OrderCreateDto orderCreateDto);
}
