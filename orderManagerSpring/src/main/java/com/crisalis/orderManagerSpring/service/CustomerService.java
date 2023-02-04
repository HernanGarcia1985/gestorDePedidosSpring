package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.CustomerDto;
import com.crisalis.orderManagerSpring.dto.OrderDetailDto;
import com.crisalis.orderManagerSpring.model.CustomerAssetService;

import java.util.List;

public interface CustomerService {
    CustomerDto getCustomerById (Integer id);

    CustomerDto createCustomer (CustomerDto customerDto);

    List<CustomerDto> getAllCustomers ();

    void destroyCustomer(Integer id);

    List<Integer> findCompaniesWithPersonInCharge(Integer id);

    CustomerDto updateCustomerById(Integer id, CustomerDto customerModified);

    CustomerDto updatePerson(Integer id, CustomerDto personModified);

    List<CustomerAssetService> assignServices (Integer idCustomer, OrderDetailDto orderDetailDto);
}
