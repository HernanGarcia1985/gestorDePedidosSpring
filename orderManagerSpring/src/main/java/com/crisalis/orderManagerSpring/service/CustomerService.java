package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.CustomerDto;

import java.util.List;

public interface CustomerService {
    CustomerDto getCustomerById (Integer id);

    CustomerDto createCustomer (CustomerDto customerDto);

    List<CustomerDto> getAllCustomers ();

    void destroyCustomer(Integer id);

    List<Integer> findCompaniesWithPersonInCharge(Integer id);
}
