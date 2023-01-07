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
    public Product(Integer id, String name, BigDecimal basePrice, BigDecimal warrantyPercentage) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.warrantyPercentage = warrantyPercentage;
    }
}
