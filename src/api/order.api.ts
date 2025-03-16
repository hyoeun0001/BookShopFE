import { Order, orderDetailItem, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./http";

export const order = async (orderData: OrderSheet) => {
  return await requestHandler<OrderSheet>("post", "/api/orders", orderData);
};

export const fetchOrders = async () => {
  return await requestHandler("get", "/api/orders");
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler("get", `/api/orders/${orderId}`);
};
