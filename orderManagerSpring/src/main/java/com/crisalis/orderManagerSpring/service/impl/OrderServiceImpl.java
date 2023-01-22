package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.dto.OrderCreateDto;
import com.crisalis.orderManagerSpring.dto.OrderDetailDto;
import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
import com.crisalis.orderManagerSpring.model.Company;
import com.crisalis.orderManagerSpring.model.Order;
import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import com.crisalis.orderManagerSpring.model.Person;
import com.crisalis.orderManagerSpring.repository.CompanyRepository;
import com.crisalis.orderManagerSpring.repository.OrderRepository;
import com.crisalis.orderManagerSpring.repository.PersonRepository;
import com.crisalis.orderManagerSpring.service.OrderService;
import com.crisalis.orderManagerSpring.service.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    PersonRepository personRepository;

    @Autowired
    OrderMapper orderMapper;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderAssetDetailServiceImpl orderAssetDetailServiceImpl;

    @Override
    public OrderDetailDto createOrder(OrderCreateDto orderCreateDto) {
        if (orderCreateDto.getOrderDetailList() == null || orderCreateDto.getOrderDetailList().isEmpty()){
            throw new NotFoundException("No assets were included in the order");
        }
        Order order = null;
        Optional<Company> company = companyRepository.findById(orderCreateDto.getIdCustomer());
        if (company.isPresent()) {
            order = orderMapper.toEntity(orderCreateDto, company.get(), null);
        } else {
            Optional<Person> person = personRepository.findById(orderCreateDto.getIdCustomer());
            if (person.isPresent()) {
                order = orderMapper.toEntity(orderCreateDto, null, person.get());
            }
        }
        if (order == null){
            throw new NotFoundException("Associate Customer not found");
        }
        Order newOrder = orderRepository.save(order);
        List<OrderAssetDetail> orderAssetDetailList = orderCreateDto.getOrderDetailList().stream()
                .map(detail -> orderAssetDetailServiceImpl.createOrderAssetDetail(detail, newOrder)
                ).collect(Collectors.toList());
        return orderMapper.orderDetailToDto(newOrder,orderAssetDetailList);
    }

    @Override
    public OrderDetailDto getOrderById(Integer id) {
        Optional<Order> orderInDb = orderRepository.findById(id);
        if (orderInDb.isPresent()){
            List<OrderAssetDetail> orderAssetDetailList = orderAssetDetailServiceImpl.getAllOrderAssetDetailByOrderId(id);
            Order order = orderInDb.get();
            return orderMapper.orderDetailToDto(order, orderAssetDetailList);
        }
        throw new NotFoundException("Order not found");
    }
}
