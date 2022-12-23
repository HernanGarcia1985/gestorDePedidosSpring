package com.crisalis.orderManagerSpring.service.mapper;

import com.crisalis.orderManagerSpring.dto.CustomerDto;
import com.crisalis.orderManagerSpring.model.Company;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public CustomerDto companyToDto (Company company){
        return CustomerDto.builder()
                .businessName(company.getBusinessName())
                .startOfActivities(company.getStartOfActivities())
                .cuit(company.getCuit())
                .address(company.getAddress())
                .phone(company.getPhone())
                .email(company.getEmail())
                .build();
    }

    public Company companyDtoToEntity (CustomerDto customerDto){
        return Company.builder()
                .businessName(customerDto.getBusinessName())
                .startOfActivities(customerDto.getStartOfActivities())
                .cuit(customerDto.getCuit())
                .address(customerDto.getAddress())
                .phone(customerDto.getPhone())
                .email(customerDto.getEmail())
                .build();
    }
}
