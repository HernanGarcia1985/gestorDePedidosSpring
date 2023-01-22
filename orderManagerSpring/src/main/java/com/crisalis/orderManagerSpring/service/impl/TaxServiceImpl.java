package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.model.Tax;
import com.crisalis.orderManagerSpring.repository.TaxRepository;
import com.crisalis.orderManagerSpring.service.TaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaxServiceImpl implements TaxService {

    @Autowired
    TaxRepository taxRepository;

    @Override
    public Tax createTax(Tax tax) {
        if (taxRepository.existsByName(tax.getName())){
            throw new RuntimeException();
        }
        Tax newTax = taxRepository.save(tax);
        return newTax;
    }
}
