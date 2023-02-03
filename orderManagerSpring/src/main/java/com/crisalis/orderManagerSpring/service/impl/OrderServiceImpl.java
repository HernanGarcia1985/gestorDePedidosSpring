package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.dto.OrderCreateDto;
import com.crisalis.orderManagerSpring.dto.OrderDetailDto;
import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
import com.crisalis.orderManagerSpring.model.*;
import com.crisalis.orderManagerSpring.repository.CompanyRepository;
import com.crisalis.orderManagerSpring.repository.OrderRepository;
import com.crisalis.orderManagerSpring.repository.PersonRepository;
import com.crisalis.orderManagerSpring.service.OrderService;
import com.crisalis.orderManagerSpring.service.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
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
        newOrder.setServiceOriginateDiscount(findServiceOriginateDiscount(orderAssetDetailList));
        if(newOrder.getServiceOriginateDiscount() != null) {
            newOrder.setTotalDiscount(calculateTotalDiscount(orderAssetDetailList));
        }
        newOrder.setDiscountPercentage(newOrder.getTotalDiscount().compareTo(BigDecimal.ZERO)>0 ? BigDecimal.valueOf(0.10) : null);
        newOrder.setTotalPrice(calculateTotalPrice(newOrder, null));
        orderRepository.save(newOrder);
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

    @Override
    public List<OrderDetailDto> getAllOrders() {
        List<Order> allOrders = orderRepository.findAll();
        if(allOrders.isEmpty()){
            throw new NotFoundException("No orders found");
        }
        List<OrderDetailDto> orderDetailDtoList = allOrders.stream()
                .map(order -> orderMapper.orderDetailToDto(order, null))
                .collect(Collectors.toList());
        return orderDetailDtoList;
    }

    @Override
    public void annulOrderById(Integer id) {
        Optional<Order> order = orderRepository.findById(id);
        if(order.isPresent()){
            Order annulOrder = order.get();
            annulOrder.setStatus(false);
            orderRepository.save(annulOrder);
        } else {
            throw new NotFoundException("Order with id "+id+" does not exist");
        }
    }

    @Override
    public OrderDetailDto validateOrder(OrderCreateDto orderCreateDto) {
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
        List<OrderAssetDetail> orderAssetDetailList = orderCreateDto.getOrderDetailList().stream()
                .map(detail -> orderAssetDetailServiceImpl.validateOrderAssetDetail(detail)
                ).collect(Collectors.toList());
        order.setServiceOriginateDiscount(findServiceOriginateDiscount(orderAssetDetailList));
        if(order.getServiceOriginateDiscount() != null) {
            order.setTotalDiscount(calculateTotalDiscount(orderAssetDetailList));
        }
        order.setDiscountPercentage(order.getTotalDiscount().compareTo(BigDecimal.ZERO)>0 ? BigDecimal.valueOf(0.10) : null);
        order.setTotalPrice(calculateTotalPrice(order, orderAssetDetailList));
        return orderMapper.orderDetailToDto(order,orderAssetDetailList);
    }

    public BigDecimal calculateTotalPrice (Order order, List<OrderAssetDetail> orderAssetDetailListParam){
        BigDecimal totalPrice;
        List<OrderAssetDetail> orderAssetDetailList;
        if (orderAssetDetailListParam != null){
            orderAssetDetailList = orderAssetDetailListParam;
        }
        else {
            orderAssetDetailList = orderAssetDetailServiceImpl.getAllOrderAssetDetailByOrderId(order.getId());
        }
        Function<OrderAssetDetail, BigDecimal> totalMapper = OrderAssetDetail::getTotalItemPrice;
        totalPrice =  orderAssetDetailList.stream()
                .map(totalMapper)
                .reduce(BigDecimal.ZERO, BigDecimal::add );
        return totalPrice; //VER descuentos
    }

    public String findServiceOriginateDiscount (List<OrderAssetDetail> orderAssetDetailList) {
        String serviceOriginateDiscount;
        List<OrderAssetDetail> orderServiceList = orderAssetDetailList.stream()
                .filter(orderAssetDetail -> orderAssetDetail.getOwnService() != null)
                .collect(Collectors.toList());
        if(orderServiceList.isEmpty()){
            //Buscar por idcustomer servicios activos
            return null;
        } else {
            serviceOriginateDiscount = orderServiceList.get(0).getOwnService().getName();
        }
        return serviceOriginateDiscount;
    }

    public BigDecimal calculateTotalDiscount (List<OrderAssetDetail> orderAssetDetailList) {
        BigDecimal totalDiscount = BigDecimal.valueOf(0);
        BigDecimal totalProductsPrice;
        List<OrderAssetDetail> orderProductList = orderAssetDetailList.stream()
                .filter(orderAssetDetail -> orderAssetDetail.getProduct() != null)
                .collect(Collectors.toList());
        Function<OrderAssetDetail, BigDecimal> totalMapper = orderAssetDetail -> orderAssetDetail.getUnitItemPrice().multiply(orderAssetDetail.getQuantity());
        if(!orderProductList.isEmpty()){
            totalProductsPrice = orderProductList.stream()
                    .map(totalMapper)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            totalDiscount = totalProductsPrice.multiply(BigDecimal.valueOf(0.10)).compareTo(BigDecimal.valueOf(2500))<0 ?
                    totalProductsPrice.multiply(BigDecimal.valueOf(0.10)) : BigDecimal.valueOf(2500);
            return totalDiscount;
        }
        return totalDiscount;
    }
}
