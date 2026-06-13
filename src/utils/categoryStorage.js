const CATEGORIES_KEY = "categories";

const DEFAULT_CATEGORIES = [
  "Stainless Steel Vessels",
  "Silver Vessels",
  "Bronze Vessels",
  "Aluminium Vessels",
  "Tiffin Boxes",
  "Water Bottles",
  "Flasks",
  "Kitchen Storage",
  "Plastic Household Products",
  "Brooms & Mops",
  "School Bags",
  "Home Essentials",
];

export function getCategories() {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) {
      saveCategories(DEFAULT_CATEGORIES);
      return DEFAULT_CATEGORIES.slice();
    }
    return JSON.parse(raw || "[]");
  } catch (e) {
    return DEFAULT_CATEGORIES.slice();
  }
}

export function saveCategories(list) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
  return list;
}

export function addCategory(name) {
  const list = getCategories();
  if (!name || list.includes(name)) return list;
  list.unshift(name);
  saveCategories(list);
  return list;
}

export function updateCategory(oldName, newName) {
  const list = getCategories();
  const idx = list.indexOf(oldName);
  if (idx === -1) return list;
  list[idx] = newName;
  saveCategories(list);
  return list;
}

export function deleteCategory(name) {
  const list = getCategories().filter((c) => c !== name);
  saveCategories(list);
  return list;
}

export default { getCategories, saveCategories, addCategory, updateCategory, deleteCategory };
