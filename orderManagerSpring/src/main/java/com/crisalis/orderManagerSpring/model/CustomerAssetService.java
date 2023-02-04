package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customers_assets_services")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class CustomerAssetService {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;

    private LocalDate activationDate;

    private Boolean active;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(name = "id_order")
    private Order order;

    @ManyToOne(
            fetch = FetchType.EAGER
            //optional = false
    )
    @JoinColumn(name = "id_company")
    private Company company;

    @ManyToOne(
            fetch = FetchType.EAGER
            //optional = false
    )
    @JoinColumn(name = "id_person")
    private Person person;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(name = "id_ownservice")
    private OwnService ownService;
}
