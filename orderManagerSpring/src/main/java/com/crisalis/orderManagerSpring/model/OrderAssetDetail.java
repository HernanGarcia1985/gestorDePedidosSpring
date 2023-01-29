package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "orders_assets_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderAssetDetail {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;

    private Integer quantity;

    private BigDecimal unitItemPrice;

    private BigDecimal totalItemPrice;

    private Integer yearsWarranty;

    private BigDecimal warrantyPercentage;

    private BigDecimal totalWarrantyPrice;

    private BigDecimal supportCharge;

    @ManyToOne(
            fetch = FetchType.EAGER
            //optional = false
    )
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne(
            fetch = FetchType.EAGER
            //optional = false
    )
    @JoinColumn(name = "id_ownService")
    private OwnService ownService;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name="id_order")
    private Order order;
}
