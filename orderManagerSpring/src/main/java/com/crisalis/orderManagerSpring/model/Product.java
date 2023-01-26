package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@DiscriminatorValue("Product")
public class Product extends Asset{

    private BigDecimal warrantyPercentage;

    @ManyToMany
    @JoinTable(
            name = "assets_taxes",
            joinColumns = {
                    @JoinColumn(name = "id_assets")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "id_taxes")
            }
    )
    private List<Tax> taxList = new ArrayList<>();

    @Builder
    public Product(Integer id, String name, BigDecimal basePrice, BigDecimal warrantyPercentage) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.warrantyPercentage = warrantyPercentage;
    }
}
