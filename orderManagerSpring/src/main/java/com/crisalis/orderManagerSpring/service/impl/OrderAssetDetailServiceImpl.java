package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.dto.OrderAssetDetailDto;
import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import com.crisalis.orderManagerSpring.model.OwnService;
import com.crisalis.orderManagerSpring.model.Product;
import com.crisalis.orderManagerSpring.repository.OrderAssetDetailRepository;
import com.crisalis.orderManagerSpring.repository.ProductRepository;
import com.crisalis.orderManagerSpring.repository.ServiceRepository;
import com.crisalis.orderManagerSpring.service.OrderAssetDetailService;
import com.crisalis.orderManagerSpring.service.mapper.OrderAssetDetailMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderAssetDetailServiceImpl implements OrderAssetDetailService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    OrderAssetDetailRepository orderAssetDetailRepository;

    @Autowired
    OrderAssetDetailMapper orderAssetDetailMapper;

    @Override
    public OrderAssetDetailDto createOrderAssetDetail(OrderAssetDetailDto orderAssetDetailDto) {
        Optional<Product> product = productRepository.findById(orderAssetDetailDto.getId_asset());
        if (product.isPresent()){
            OrderAssetDetail orderAssetDetail = orderAssetDetailMapper.toEntity(orderAssetDetailDto, product.get(), null);
            OrderAssetDetail newOrderAssetDetail = orderAssetDetailRepository.save(orderAssetDetail);
            return orderAssetDetailMapper.toDto(newOrderAssetDetail);
        }
        else {
            Optional<OwnService> ownService = serviceRepository.findById(orderAssetDetailDto.getId_asset());
            if (ownService.isPresent()){
                OrderAssetDetail orderAssetDetail = orderAssetDetailMapper.toEntity(orderAssetDetailDto, null, ownService.get());
                OrderAssetDetail newOrderAssetDetail = orderAssetDetailRepository.save(orderAssetDetail);
                return orderAssetDetailMapper.toDto(newOrderAssetDetail);
            }
        }
        throw new NotFoundException("Associate Asset not found");
    }
}
