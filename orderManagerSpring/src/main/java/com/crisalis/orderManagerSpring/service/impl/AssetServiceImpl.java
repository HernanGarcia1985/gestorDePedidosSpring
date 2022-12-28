package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.dto.AssetDto;
import com.crisalis.orderManagerSpring.exception.custom.EmptyElementException;
import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
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
import java.util.Optional;
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

    @Override
    public AssetDto getAssetById(Integer id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            return assetMapper.productToDto(product.get());
            }
        Optional<OwnService> ownService = serviceRepository.findById(id);
        if(ownService.isPresent()){
            return assetMapper.serviceToDto(ownService.get());
        }
        throw new NotFoundException("Asset not found");
    }

    @Override
    public void destroyAsset(Integer id) {
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
        } else if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
        } else {
            throw new NotFoundException("Asset with id "+id+" does not exist");
        }
    }

    @Override
    public AssetDto updateAssetById(Integer id, AssetDto assetModified) {
        if(productRepository.existsById(id)){
            Product assetUpdated = assetMapper.productDtoToEntity(assetModified);
            assetUpdated.setId(id);
            productRepository.save(assetUpdated);
            return assetMapper.productToDto(assetUpdated);
        } else if (serviceRepository.existsById(id)) {
            OwnService assetUpdated = assetMapper.serviceDtoToEntity(assetModified);
            assetUpdated.setId(id);
            serviceRepository.save(assetUpdated);
            return assetMapper.serviceToDto(assetUpdated);
        } else {
            throw new NotFoundException("Asset with id "+id+" does not exist");
        }
    }
}
