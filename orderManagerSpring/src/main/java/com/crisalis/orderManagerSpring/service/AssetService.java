package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.dto.AssetDto;

import java.util.List;

public interface AssetService {

    AssetDto createAsset (AssetDto assetDto);

    List<AssetDto> getAllAssets ();

    AssetDto getAssetById(Integer id);
}
