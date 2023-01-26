package com.crisalis.orderManagerSpring.controller;

import com.crisalis.orderManagerSpring.model.Tax;
import com.crisalis.orderManagerSpring.service.impl.TaxServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/taxes")
public class TaxController {

    @Autowired
    TaxServiceImpl taxServiceImpl;

    @PostMapping(value = "" , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createTax(@Valid @RequestBody Tax tax) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taxServiceImpl.createTax(tax));
    }

    @GetMapping(value = "" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllTaxes(){
        List<Tax> taxList = taxServiceImpl.getAllTaxes();
        if (taxList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No taxes found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(taxList);
    }

    @GetMapping(value = "/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTaxById(@PathVariable(value = "id") Integer id){
        return ResponseEntity.status(HttpStatus.OK).body(taxServiceImpl.getTaxById(id));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> destroyTax(@PathVariable(value = "id") Integer id){
        taxServiceImpl.destroyTax(id);
        return ResponseEntity.status(HttpStatus.OK).body("Tax with id "+id+" was deleted successfully!");
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateTax(@PathVariable(value = "id") Integer id, @RequestBody Tax tax){
        return ResponseEntity.status(HttpStatus.OK).body(taxServiceImpl.updateTaxById(id, tax));
    }
}
