package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.*;

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

    private Double quantity;

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
}
