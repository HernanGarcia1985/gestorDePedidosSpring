package com.crisalis.orderManagerSpring.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto {

    private Integer id;

    private Integer idCustomer;

    private List<OrderAssetDetailDto> orderDetail = new ArrayList();
}
