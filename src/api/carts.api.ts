import { Cart } from "../models/cart.model";
import { httpClient } from "./http";

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post("/api/cart", params);
  return response.data;
};

export const fetchCart = async () => {
  const response = await httpClient.get<Cart[]>("/api/cart");
  return response.data;
};

export const deleteCart = async (cartId: number) => {
  const response = await httpClient.delete(`/api/cart/${cartId}`);
  return response.data;
};
