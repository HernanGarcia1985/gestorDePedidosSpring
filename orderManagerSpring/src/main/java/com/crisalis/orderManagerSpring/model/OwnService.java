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
@DiscriminatorValue("Service")
public class OwnService extends Asset{

    private Boolean special;

    private BigDecimal supportCharge;

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
    public OwnService(Integer id, String name, BigDecimal basePrice, Boolean special, BigDecimal supportCharge) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.special = special;
        this.supportCharge = supportCharge;
    }
}
