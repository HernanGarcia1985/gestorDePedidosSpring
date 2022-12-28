package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.dto.CustomerDto;
import com.crisalis.orderManagerSpring.exception.custom.EmptyElementException;
import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
import com.crisalis.orderManagerSpring.model.Company;
import com.crisalis.orderManagerSpring.model.Person;
import com.crisalis.orderManagerSpring.repository.CompanyRepository;
import com.crisalis.orderManagerSpring.repository.PersonRepository;
import com.crisalis.orderManagerSpring.service.CustomerService;
import com.crisalis.orderManagerSpring.service.mapper.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    PersonRepository personRepository;

    @Autowired
    CustomerMapper customerMapper;

    @Override
    public CustomerDto getCustomerById(Integer id) {
        Optional<Company> company = companyRepository.findById(id);
        if(company.isPresent()){
            return customerMapper.companyToDto(company.get());
        }
        Optional<Person> person = personRepository.findById(id);
        if(person.isPresent()){
            return customerMapper.personToDto(person.get());
        }
        throw new NotFoundException("Customer not found");
    }

    @Override
    public CustomerDto createCustomer (CustomerDto customerDto){
        String customerType = customerDto.getCustomerType().toLowerCase();
        if (customerType.equals("company")){
            Person personInCharge = new Person(customerDto.getName(), customerDto.getLastName(), customerDto.getDni());
            Person newPersonInCharge = personRepository.save(personInCharge);
            Company company = customerMapper.companyDtoToEntity(customerDto, newPersonInCharge);
            Company newCompany = companyRepository.save(company);
            return customerMapper.companyToDto(newCompany);
        } else if (customerType.equals("person")) {
            Person person = customerMapper.personDtoToEntity(customerDto);
            Person newPerson = personRepository.save(person);
            return customerMapper.personToDto(newPerson);
        }
        throw new EmptyElementException("Customer type is not specified");
    }

    @Override
    public List<CustomerDto> getAllCustomers() {
        List<CustomerDto> allCompanies = companyRepository.findAll()
                .stream()
                .map(customerMapper::companyToDto)
                .collect(Collectors.toList());

        List<CustomerDto> allPersons = personRepository.findAll()
                .stream()
                .map(customerMapper::personToDto)
                .collect(Collectors.toList());

        List<CustomerDto> allCustomers = new ArrayList<>();

        allCustomers.addAll(allCompanies);
        allCustomers.addAll(allPersons);

        return allCustomers;
    }
}
