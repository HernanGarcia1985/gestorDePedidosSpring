package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
import com.crisalis.orderManagerSpring.model.Tax;
import com.crisalis.orderManagerSpring.repository.TaxRepository;
import com.crisalis.orderManagerSpring.service.TaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public List<Tax> getAllTaxes() {
        List<Tax> taxList = taxRepository.findAll();
        if (taxList.isEmpty()){
            throw new NotFoundException("No taxes found");
        }
        return taxList;
    }

    @Override
    public Tax getTaxById(Integer id) {
        Optional<Tax> tax = taxRepository.findById(id);
        if (tax.isPresent()){
            return tax.get();
        }
        throw new NotFoundException("Tax with id "+ id +" not found");
    }

    @Override
    public void destroyTax(Integer id) {
        if(taxRepository.existsById(id)){
            taxRepository.deleteById(id);
        } else {
            throw new NotFoundException("Tax with id "+id+" does not exist");
        }
    }

    @Override
    public Tax updateTaxById(Integer id, Tax tax) {
        if(taxRepository.existsById(id)){
            tax.setId(id);
            Tax taxModified = taxRepository.save(tax);
            return taxModified;
        } else {
            throw new NotFoundException("Tax with id "+id+" does not exist");
        }
    }
}
