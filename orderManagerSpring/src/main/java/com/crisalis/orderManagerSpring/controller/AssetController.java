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

    @GetMapping(value = "/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssetById(@PathVariable(value = "id") Integer id){
        AssetDto asset = assetServiceImpl.getAssetById(id);
        if (asset == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No asset found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(asset);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> destroyAsset(@PathVariable(value = "id") Integer id){

        assetServiceImpl.destroyAsset(id);
        return ResponseEntity.status(HttpStatus.OK).body("Asset with id "+id+" was deleted successfully");
    }
}
