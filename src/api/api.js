
const BASE_URL = "https://api.xezernn.com.az";

 
export async function getFullCategory() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error(`Ошибка загрузки категорий: ${res.status}`);
  return res.json();
}


export async function getFullSubcategory() {
  const res = await fetch(`${BASE_URL}/categories/subcategories`);
  if (!res.ok) throw new Error(`Ошибка загрузки субкатегорий: ${res.status}`);
  return res.json();
}

export async function getCategoryById(id) {
  const res = await fetch(`${BASE_URL}/categories/${id}`);
  if (!res.ok) throw new Error(`Ошибка загрузки категории ${id}: ${res.status}`);
  return res.json();
}


export async function getProductsByCategory(categoryId) {
  const res = await fetch(`${BASE_URL}/products/category/${categoryId}`);
  if (!res.ok) throw new Error(`Ошибка загрузки продуктов категории ${categoryId}: ${res.status}`);
  return res.json();
}

export async function searchProduct(name) {
  if (name.length < 2) {
    return { products: [], totalProducts: 0, totalPages: null, currentPage: null };
  }
  const url = new URL(`${BASE_URL}/products/search`);
  url.searchParams.set("name", name);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Ошибка поиска продуктов: ${res.status}`);
  }
  return res.json();
}

export default {
  getFullCategory,
  getFullSubcategory,
  getCategoryById,
  getProductsByCategory,
  searchProduct,
};
