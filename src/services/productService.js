import api from "./api";

export async function getProducts(limit = 0, skip = 0) {
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export function getSavedStock() {
  return JSON.parse(localStorage.getItem("productStock") || "{}");
}

export function saveProductStock(productId, stock) {
  const savedStock = getSavedStock();

  savedStock[productId] = stock;

  localStorage.setItem("productStock", JSON.stringify(savedStock));
}


export function getProductStock(product) {
  const savedStock = getSavedStock();

  return savedStock[product.id] ?? product.stock;
}

export async function searchProducts(query) {
  const response = await api.get(
    `/products/search?q=${encodeURIComponent(query)}`
  );
  return response.data;
}

export async function getCategories() {
  const response = await api.get("/products/categories");
  return response.data;
}

export async function getProductsByCategory(category) {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
}

export async function addProduct(product) {
  const response = await api.post("/products/add", product);
  return response.data;
}

export async function updateProduct(id, product) {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}