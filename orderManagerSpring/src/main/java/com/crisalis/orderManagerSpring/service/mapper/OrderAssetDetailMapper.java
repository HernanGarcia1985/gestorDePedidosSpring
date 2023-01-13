package com.crisalis.orderManagerSpring.service.mapper;

import com.crisalis.orderManagerSpring.dto.OrderAssetDetailDto;
import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import com.crisalis.orderManagerSpring.model.OwnService;
import com.crisalis.orderManagerSpring.model.Product;
import org.springframework.stereotype.Component;

@Component
public class OrderAssetDetailMapper {

    public OrderAssetDetailDto toDto (OrderAssetDetail orderAssetDetail){
        return OrderAssetDetailDto.builder()
                .id(orderAssetDetail.getId())
                .quantity(orderAssetDetail.getQuantity())
                .id_asset(orderAssetDetail.getProduct() != null ? orderAssetDetail.getProduct().getId() : orderAssetDetail.getOwnService().getId())
                .build();
    }

    public OrderAssetDetail toEntity (OrderAssetDetailDto orderAssetDetailDto, Product product, OwnService ownService){
        return OrderAssetDetail.builder()
                .id(orderAssetDetailDto.getId())
                .quantity(orderAssetDetailDto.getQuantity())
                .product(product)
                .ownService(ownService)
                .build();
    }
}
