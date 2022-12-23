package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
//@AllArgsConstructor
//@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="customerType")
@Table(name = "customers")
public abstract class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(name = "address")
    protected String address;

    @Column(name = "phone")
    protected String phone;

    @Column(name = "email")
    protected String email;

}
