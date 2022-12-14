package com.crisalis.orderManagerSpring.dto;

import lombok.*;


import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {

    private Integer id;

    private String businessName;

    private LocalDate startOfActivities;

    private String cuit;

    private String address;

    private String phone;

    private String email;

    private String customerType;

    private Boolean updatePersonInCharge;

    private String name;

    private String lastName;

    private String dni;

}
