package com.crisalis.orderManagerSpring.service.mapper;

import com.crisalis.orderManagerSpring.dto.AssetDto;
import com.crisalis.orderManagerSpring.model.OwnService;
import com.crisalis.orderManagerSpring.model.Product;
import org.springframework.stereotype.Component;

@Component
public class AssetMapper {

    public AssetDto serviceToDto (OwnService ownService){
        return AssetDto.builder()
                .name(ownService.getName())
                .basePrice(ownService.getBasePrice())
                .special(ownService.getSpecial())
                .supportCharge(ownService.getSupportCharge())
                .assetType("Service")
                .build();
    }

    public OwnService serviceDtoToEntity (AssetDto assetDto){
        return OwnService.builder()
                .name(assetDto.getName())
                .basePrice(assetDto.getBasePrice())
                .special(assetDto.getSpecial())
                .supportCharge(assetDto.getSupportCharge())
                .build();
    }

    public AssetDto productToDto (Product product){
        return AssetDto.builder()
                .name(product.getName())
                .basePrice(product.getBasePrice())
                .warrantyPercentage(product.getWarrantyPercentage())
                .assetType("Product")
                .build();
    }

    public Product productDtoToEntity (AssetDto assetDto){
        return Product.builder()
                .name(assetDto.getName())
                .basePrice(assetDto.getBasePrice())
                .warrantyPercentage(assetDto.getWarrantyPercentage())
                .build();
    }
}
