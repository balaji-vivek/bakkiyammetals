import React, { useEffect, useState } from "react";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../utils/categoryStorage";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    if (!value.trim()) return;
    const updated = addCategory(value.trim());
    setCategories(updated);
    setValue("");
  }

  function handleEdit(e) {
    e.preventDefault();
    if (!value.trim() || !editing) return;
    const updated = updateCategory(editing, value.trim());
    setCategories(updated);
    setEditing(null);
    setValue("");
  }

  function startEdit(name) {
    setEditing(name);
    setValue(name);
  }

  function remove(name) {
    if (!confirm(`Delete category "${name}"?`)) return;
    const updated = deleteCategory(name);
    setCategories(updated);
  }

  const visible = categories.filter((c) => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="admin-categories">
      <div className="table-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3>Categories</h3>
          <div style={{ color: "#6b7280" }}>Total: {categories.length}</div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <form onSubmit={editing ? handleEdit : handleAdd} className="category-form">
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Category name" />
          <button className="btn primary" type="submit">{editing ? "Save" : "Add"}</button>
          {editing && <button type="button" className="btn" onClick={() => { setEditing(null); setValue(""); }}>Cancel</button>}
        </form>

        <div className="categories-list">
          {visible.map((c) => (
            <div key={c} className="category-row">
              <div>{c}</div>
              <div className="actions">
                <button className="btn" onClick={() => startEdit(c)}>Edit</button>
                <button className="btn danger" onClick={() => remove(c)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminCategories;
