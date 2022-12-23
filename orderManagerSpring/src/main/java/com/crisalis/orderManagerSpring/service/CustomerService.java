package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.CustomerDto;

public interface CustomerService {
    CustomerDto find (Integer id);

    CustomerDto createCustomer (CustomerDto customerDto);
}
