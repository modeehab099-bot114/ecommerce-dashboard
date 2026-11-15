
import api from "./api";

export async function getCarts(limit = 10, skip = 0) {
  const response = await api.get(`/carts?limit=${limit}&skip=${skip}`);
  return response.data;
}

export async function getCartById(id) {
  const response = await api.get(`/carts/${id}`);
  return response.data;
}

export async function getCartsByUser(userId) {
  const response = await api.get(`/carts/user/${userId}`);
  return response.data;
}

export async function addCart(cart) {
  const response = await api.post("/carts/add", cart);
  return response.data;
}

export async function updateCart(id, cart) {
  const response = await api.put(`/carts/${id}`, cart);
  return response.data;
}

export async function deleteCart(id) {
  const response = await api.delete(`/carts/${id}`);
  return response.data;
}
