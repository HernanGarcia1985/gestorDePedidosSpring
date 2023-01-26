package com.crisalis.orderManagerSpring.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="assetType")
@Table(name = "assets")
public abstract class Asset {

    @Id
   /* @SequenceGenerator(
            name = "asset_sequence",
            sequenceName = "asset_sequence",
            allocationSize = 1,
            initialValue = 1
    )*/
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
            /*strategy = GenerationType.SEQUENCE,
            generator = "asset_sequence"*/
    )
    protected Integer id;

    @Column(name = "name")
    protected String name;

    @Column(name = "basePrice")
    protected BigDecimal basePrice;

}
