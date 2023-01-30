package com.crisalis.orderManagerSpring.dto;

import com.crisalis.orderManagerSpring.model.Company;
import com.crisalis.orderManagerSpring.model.OrderAssetDetail;
import com.crisalis.orderManagerSpring.model.Person;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailDto {

    private Integer id;

    private Company company;

    private Person person;

    private LocalDate dateCreated;

    private BigDecimal totalPrice;

    private BigDecimal subTotalPrice;

    private BigDecimal totalDiscount;

    private Boolean status;

    private List<OrderAssetDetail> orderDetailList = new ArrayList();
}
