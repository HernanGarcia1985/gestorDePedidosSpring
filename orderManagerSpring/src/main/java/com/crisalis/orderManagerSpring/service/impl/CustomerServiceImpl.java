package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.dto.CustomerDto;
import com.crisalis.orderManagerSpring.exception.custom.EmptyElementException;
import com.crisalis.orderManagerSpring.model.Company;
import com.crisalis.orderManagerSpring.repository.CompanyRepository;
import com.crisalis.orderManagerSpring.service.CustomerService;
import com.crisalis.orderManagerSpring.service.mapper.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    CustomerMapper customerMapper;

    @Override
    public CustomerDto find(Integer id) {
        Optional<Company> result = companyRepository.findById(id);
        if(result.isPresent()){
            Company company = result.get();
            return customerMapper.companyToDto(company);
        } else {
            throw new EmptyElementException("Customer not found");
        }
    }

    @Override
    public CustomerDto createCustomer (CustomerDto customerDto){
        Company company = customerMapper.companyDtoToEntity(customerDto);
        Company newCompany = companyRepository.save(company);
        return customerMapper.companyToDto(newCompany);
    }
}
