package com.crisalis.orderManagerSpring.service;


import com.crisalis.orderManagerSpring.model.Order;
import com.crisalis.orderManagerSpring.model.OrderAssetDetail;

import java.util.List;

public interface OrderAssetDetailService {

    List<OrderAssetDetail> getAllOrderAssetDetailByOrderId (Integer id);

    OrderAssetDetail createOrderAssetDetail (OrderAssetDetail orderAssetDetail, Order order);
}
