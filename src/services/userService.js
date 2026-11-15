
import api from "./api";

export async function getUsers(limit = 10, skip = 0) {
  const response = await api.get(`/users?limit=${limit}&skip=${skip}`);
  return response.data;
}

export async function getUserById(id) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function searchUsers(query) {
  const response = await api.get(
    `/users/search?q=${encodeURIComponent(query)}`
  );
  return response.data;
}

export async function addUser(user) {
  const response = await api.post("/users/add", user);
  return response.data;
}

export async function updateUser(id, user) {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
}

export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}
