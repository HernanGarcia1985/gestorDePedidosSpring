package com.crisalis.orderManagerSpring.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetDto {

    private Integer id;

    private String name;

    private BigDecimal basePrice;

    private Boolean special;

    private BigDecimal supportCharge;

    private BigDecimal warrantyPercentage;

    private String assetType;
}
