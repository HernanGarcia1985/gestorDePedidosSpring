package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@DiscriminatorValue("Person")
public class Person extends Customer{

    private String name;

    private String lastName;

    private String dni;

    @Builder
    public Person(String address, String phone, String email, String name, String lastName, String dni) {
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
    }
}
