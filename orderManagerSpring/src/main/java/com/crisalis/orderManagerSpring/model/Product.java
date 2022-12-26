package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@DiscriminatorValue("Product")
public class Product extends Asset{

    private BigDecimal warrantyPercentage;

    @Builder
    public Product(String name, BigDecimal basePrice, BigDecimal warrantyPercentage) {
        this.name = name;
        this.basePrice = basePrice;
        this.warrantyPercentage = warrantyPercentage;
    }
}
