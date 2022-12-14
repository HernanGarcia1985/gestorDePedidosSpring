package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.*;

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
    public Person(Integer id, String address, String phone, String email, String name, String lastName, String dni) {
        this.id = id;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
    }
}
