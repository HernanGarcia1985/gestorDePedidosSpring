package com.crisalis.orderManagerSpring.service.mapper;

import com.crisalis.orderManagerSpring.dto.CustomerDto;
import com.crisalis.orderManagerSpring.model.Company;
import com.crisalis.orderManagerSpring.model.CustomerAssetService;
import com.crisalis.orderManagerSpring.model.Person;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomerMapper {

    public CustomerDto companyToDto (Company company, List<CustomerAssetService> customerAssetServiceList){
        return CustomerDto.builder()
                .id(company.getId())
                .businessName(company.getBusinessName())
                .startOfActivities(company.getStartOfActivities())
                .cuit(company.getCuit())
                .address(company.getAddress())
                .phone(company.getPhone())
                .email(company.getEmail())
                .customerType("company")
                .name(company.getPerson().getName())
                .lastName(company.getPerson().getLastName())
                .dni(company.getPerson().getDni())
                .customerAssetServiceList(customerAssetServiceList != null ? customerAssetServiceList : new ArrayList<>())
                .build();
    }

    public Company companyDtoToEntity (CustomerDto customerDto, Person person){
        return Company.builder()
                .id(customerDto.getId())
                .businessName(customerDto.getBusinessName())
                .startOfActivities(customerDto.getStartOfActivities())
                .cuit(customerDto.getCuit())
                .address(customerDto.getAddress())
                .phone(customerDto.getPhone())
                .email(customerDto.getEmail())
                .person(person)
                .build();
    }


    public CustomerDto personToDto (Person person, List<CustomerAssetService> customerAssetServiceList){
        return CustomerDto.builder()
                .id(person.getId())
                .name(person.getName())
                .lastName(person.getLastName())
                .dni(person.getDni())
                .address(person.getAddress())
                .phone(person.getPhone())
                .email(person.getEmail())
                .customerType("person")
                .customerAssetServiceList(customerAssetServiceList != null ? customerAssetServiceList : new ArrayList<>())
                .build();
    }

    public Person personDtoToEntity (CustomerDto customerDto){
        return Person.builder()
                .id(customerDto.getId())
                .name(customerDto.getName())
                .lastName(customerDto.getLastName())
                .dni(customerDto.getDni())
                .address(customerDto.getAddress())
                .phone(customerDto.getPhone())
                .email(customerDto.getEmail())
                .build();
    }
}
