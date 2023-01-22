package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.OrderCreateDto;
import com.crisalis.orderManagerSpring.dto.OrderDetailDto;

public interface OrderService {

    OrderDetailDto createOrder (OrderCreateDto orderCreateDto);

    OrderDetailDto getOrderById(Integer id);
}
