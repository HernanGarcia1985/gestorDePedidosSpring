package com.crisalis.orderManagerSpring.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderAssetDetailDto {

    private Integer id;

    private Double quantity;

    private Integer id_asset;

}
