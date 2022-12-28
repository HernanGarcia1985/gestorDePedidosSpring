package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.dto.AssetDto;
import com.crisalis.orderManagerSpring.exception.custom.EmptyElementException;
import com.crisalis.orderManagerSpring.model.OwnService;
import com.crisalis.orderManagerSpring.model.Product;
import com.crisalis.orderManagerSpring.repository.ProductRepository;
import com.crisalis.orderManagerSpring.repository.ServiceRepository;
import com.crisalis.orderManagerSpring.service.AssetService;
import com.crisalis.orderManagerSpring.service.mapper.AssetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    AssetMapper assetMapper;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public AssetDto createAsset(AssetDto assetDto) {
        String assetType = assetDto.getAssetType().toLowerCase();
        if (assetType.equals("service")){
            OwnService ownService = assetMapper.serviceDtoToEntity(assetDto);
            OwnService newService = serviceRepository.save(ownService);
            return assetMapper.serviceToDto(newService);
        } else if (assetType.equals("product")) {
            Product product = assetMapper.productDtoToEntity(assetDto);
            Product newProduct = productRepository.save(product);
            return assetMapper.productToDto(newProduct);
        }
        throw new EmptyElementException("Asset type is not specified");
    }

    @Override
    public List<AssetDto> getAllAssets(){
        List<AssetDto> allProducts = productRepository.findAll()
                .stream()
                .map(assetMapper::productToDto)
                .collect(Collectors.toList());

        List<AssetDto> allServices = serviceRepository.findAll()
                .stream()
                .map(assetMapper::serviceToDto)
                .collect(Collectors.toList());

        List<AssetDto> allAssets = new ArrayList<>();

        allAssets.addAll(allProducts);
        allAssets.addAll(allServices);

        return allAssets;
    }
}
