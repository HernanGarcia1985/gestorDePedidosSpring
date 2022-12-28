package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.CustomerDto;

import java.util.List;

public interface CustomerService {
    CustomerDto find (Integer id);

    CustomerDto createCustomer (CustomerDto customerDto);

    List<CustomerDto> getAllCustomers ();
}
