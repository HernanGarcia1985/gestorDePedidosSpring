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
@DiscriminatorValue("Service")
public class OwnService extends Asset{

    private Boolean special;

    private BigDecimal supportCharge;

    @Builder
    public OwnService(String name, BigDecimal basePrice, Boolean special, BigDecimal supportCharge) {
        this.name = name;
        this.basePrice = basePrice;
        this.special = special;
        this.supportCharge = supportCharge;
    }
}
