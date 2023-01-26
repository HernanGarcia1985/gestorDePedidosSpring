package com.crisalis.orderManagerSpring.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "taxes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Tax {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer id;

    @NotBlank
    private String name;

    @NotNull
    private BigDecimal percentage;

}
