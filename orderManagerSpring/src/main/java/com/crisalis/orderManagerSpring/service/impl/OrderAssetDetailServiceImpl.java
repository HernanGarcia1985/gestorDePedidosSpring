package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
import com.crisalis.orderManagerSpring.model.Order;
import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import com.crisalis.orderManagerSpring.model.OwnService;
import com.crisalis.orderManagerSpring.model.Product;
import com.crisalis.orderManagerSpring.repository.OrderAssetDetailRepository;
import com.crisalis.orderManagerSpring.repository.ProductRepository;
import com.crisalis.orderManagerSpring.repository.ServiceRepository;
import com.crisalis.orderManagerSpring.service.OrderAssetDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderAssetDetailServiceImpl implements OrderAssetDetailService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    OrderAssetDetailRepository orderAssetDetailRepository;

    @Override
    public List<OrderAssetDetail> getAllOrderAssetDetailByOrderId(Integer id) {
        List<OrderAssetDetail> orderAssetDetailList = orderAssetDetailRepository.findByOrderId(id).orElseThrow(() -> new RuntimeException("Casa"));
        if(orderAssetDetailList.isEmpty()){
            return null;
        }
        return orderAssetDetailList;
    }

    @Override
    public OrderAssetDetail createOrderAssetDetail(OrderAssetDetail orderAssetDetail, Order order) {
        if (orderAssetDetail.getProduct() != null) {
            Optional<Product> product = productRepository.findById(orderAssetDetail.getProduct().getId());
            if (product.isPresent()) {
                orderAssetDetail.setOrder(order);
                return orderAssetDetailRepository.save(orderAssetDetail);
            }
        } else {
            Optional<OwnService> ownService = serviceRepository.findById(orderAssetDetail.getOwnService().getId());
            if (ownService.isPresent()) {
                orderAssetDetail.setOrder(order);
                return orderAssetDetailRepository.save(orderAssetDetail);
            }
        }
        throw new NotFoundException("Associate Asset not found");
    }
}
