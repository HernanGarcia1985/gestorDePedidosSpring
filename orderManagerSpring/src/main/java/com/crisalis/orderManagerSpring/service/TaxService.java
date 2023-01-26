package com.crisalis.orderManagerSpring.service;

import com.crisalis.orderManagerSpring.model.Tax;

import java.util.List;

public interface TaxService {

    public Tax createTax(Tax tax);

    public List<Tax> getAllTaxes();

    public Tax getTaxById(Integer id);

    public void destroyTax(Integer id);

    public Tax updateTaxById(Integer id, Tax tax);
}
