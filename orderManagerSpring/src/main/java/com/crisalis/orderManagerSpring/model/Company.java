package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
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

    @Builder
    public Company(String address, String phone, String email, String businessName, LocalDate startOfActivities, String cuit ){
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.businessName = businessName;
        this.startOfActivities = startOfActivities;
        this.cuit = cuit;
    }
}
