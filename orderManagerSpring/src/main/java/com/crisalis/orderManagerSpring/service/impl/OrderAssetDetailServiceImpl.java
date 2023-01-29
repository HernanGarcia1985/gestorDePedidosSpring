package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
import com.crisalis.orderManagerSpring.model.*;
import com.crisalis.orderManagerSpring.repository.OrderAssetDetailRepository;
import com.crisalis.orderManagerSpring.repository.ProductRepository;
import com.crisalis.orderManagerSpring.repository.ServiceRepository;
import com.crisalis.orderManagerSpring.service.OrderAssetDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

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
                orderAssetDetail.setUnitItemPrice(calculateItemPrice(product.get(), null));
                orderAssetDetail.setOrder(order);
                return orderAssetDetailRepository.save(orderAssetDetail);
            }
        } else {
            Optional<OwnService> ownService = serviceRepository.findById(orderAssetDetail.getOwnService().getId());
            if (ownService.isPresent()) {
                orderAssetDetail.setUnitItemPrice(calculateItemPrice(null, ownService.get()));
                orderAssetDetail.setOrder(order);
                return orderAssetDetailRepository.save(orderAssetDetail);
            }
        }
        throw new NotFoundException("Associate Asset not found");
    }

    public BigDecimal calculateItemPrice(Product product, OwnService ownService) {
        BigDecimal totalTax;
        BigDecimal itemPrice = BigDecimal.valueOf(0);
        if(product !=null){
            List<Tax> taxList = product.getTaxList();
            Function<Tax, BigDecimal> totalMapper = Tax::getPercentage;
            BigDecimal sumTaxes = taxList.stream()
                    .map(totalMapper)
                    .reduce(BigDecimal.ZERO, BigDecimal::add );
            itemPrice = itemPrice.add(product.getBasePrice());
            totalTax = itemPrice.multiply(sumTaxes);
            itemPrice = itemPrice.add(totalTax);
            return itemPrice;
        } else if (ownService !=null){
            List<Tax> taxList = ownService.getTaxList();
            Function<Tax, BigDecimal> totalMapper = Tax::getPercentage;
            BigDecimal sumTaxes = taxList.stream()
                    .map(totalMapper)
                    .reduce(BigDecimal.ZERO, BigDecimal::add );
            itemPrice = itemPrice.add(ownService.getBasePrice());
            totalTax = itemPrice.multiply(sumTaxes);
            itemPrice = itemPrice.add(totalTax);
            return itemPrice;
        } else {
            throw new NotFoundException("There are no assets associated");
        }
    }
}
