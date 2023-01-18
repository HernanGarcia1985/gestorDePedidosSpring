
package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Order {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;

    private LocalDate dateCreated;

    private BigDecimal totalPrice;

    private BigDecimal totalDiscount;

    private BigDecimal discountPercentage;

    private String voucherNumber;

    private String serviceOriginateDiscount;

    private Boolean status;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(name = "id_customer")
    private Customer customer;

    /*@OneToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    private Set<OrderAssetDetail> orderAssetDetailSet = new HashSet<>();*/
}

