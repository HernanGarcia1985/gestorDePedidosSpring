package com.crisalis.orderManagerSpring.controller;

import com.crisalis.orderManagerSpring.model.Tax;
import com.crisalis.orderManagerSpring.service.impl.TaxServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
}
