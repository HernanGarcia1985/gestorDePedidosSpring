package com.crisalis.orderManagerSpring.service.mapper;

import com.crisalis.orderManagerSpring.dto.OrderCreateDto;

import com.crisalis.orderManagerSpring.dto.OrderDetailDto;
import com.crisalis.orderManagerSpring.model.Company;
import com.crisalis.orderManagerSpring.model.Order;
import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import com.crisalis.orderManagerSpring.model.Person;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class OrderMapper {

    public OrderCreateDto toDto (Order order){
        return OrderCreateDto.builder()
                .id(order.getId())
                .idCustomer(order.getCompany() != null ? order.getCompany().getId() : order.getPerson().getId())
                //.orderDetailList(order.get)
                .build();
    }

    public Order toEntity (OrderCreateDto orderDto, Company company, Person person){
        return Order.builder()
                .id(orderDto.getId())
                .dateCreated(LocalDate.now())
                .company(company)
                .person(person)
                .status(true)
                .build();
    }

    public OrderDetailDto orderDetailToDto (Order order, List<OrderAssetDetail> orderAssetDetailList){
        return OrderDetailDto.builder()
                .id(order.getId())
                .company(order.getCompany() != null ? order.getCompany(): null)
                .person(order.getPerson() != null ? order.getPerson() : null)
                .dateCreated(order.getDateCreated())
                .status(order.getStatus())
                .orderDetailList(orderAssetDetailList)
                .build();
    }
}
