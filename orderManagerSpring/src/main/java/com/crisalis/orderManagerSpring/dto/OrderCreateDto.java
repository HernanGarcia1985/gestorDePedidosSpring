package com.crisalis.orderManagerSpring.dto;

import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderCreateDto {

    private Integer id;

    private Integer idCustomer;

    private List<OrderAssetDetail> orderDetailList = new ArrayList();
}
