import { products as seedProducts } from "../data/product";

const KEY = "products";

export function getProducts() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    localStorage.setItem(KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }
}

export function saveProducts(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addProduct(product) {
  const list = getProducts();
  const nextId = list.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const newProduct = { ...product, id: nextId };
  const updated = [newProduct, ...list];
  saveProducts(updated);
  return updated;
}

export function updateProduct(id, updates) {
  const list = getProducts();
  const updated = list.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveProducts(updated);
  return updated;
}

export function deleteProduct(id) {
  const list = getProducts();
  const updated = list.filter((p) => p.id !== id);
  saveProducts(updated);
  return updated;
}
