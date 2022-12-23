package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@DiscriminatorValue("Person")
public class Person extends Customer implements Serializable {

    private static final Long serialVersionUID = 1L;

    private String name;

    private String lastName;

    private String dni;
}
