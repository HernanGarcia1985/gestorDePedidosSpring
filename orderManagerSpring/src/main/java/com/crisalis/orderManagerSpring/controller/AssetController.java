package com.crisalis.orderManagerSpring.controller;

import com.crisalis.orderManagerSpring.dto.AssetDto;
import com.crisalis.orderManagerSpring.service.impl.AssetServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

    @Autowired
    AssetServiceImpl assetServiceImpl;

    @PostMapping(value = "" , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAsset(@RequestBody AssetDto assetDto) {
        try{
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(assetServiceImpl.createAsset(assetDto));
        } catch (Exception exception){
            throw new RuntimeException();
        }
    }

    @GetMapping(value = "" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllAssets(){
        List<AssetDto> assetList = assetServiceImpl.getAllAssets();
        if (assetList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No assets found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(assetList);
    }
}
