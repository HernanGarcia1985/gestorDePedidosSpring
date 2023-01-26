package com.crisalis.orderManagerSpring.dto;

import com.crisalis.orderManagerSpring.model.Tax;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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

    @JsonProperty(value = "assetTaxesUpdated")
    private List<Tax> taxList = new ArrayList<>();
}
