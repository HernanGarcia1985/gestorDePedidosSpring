package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@DiscriminatorValue("Company")
public class Company extends Customer {

    private String businessName;

    private LocalDate startOfActivities;

    private String cuit;

    @OneToOne
    private Person person;

    @Builder
    public Company(Integer id, String address, String phone, String email, String businessName, LocalDate startOfActivities, String cuit, Person person ){
        this.id = id;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.businessName = businessName;
        this.startOfActivities = startOfActivities;
        this.cuit = cuit;
        this.person = person;
    }
}
