import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { addProduct, updateProduct, deleteProduct } from "../utils/productStorage";
import { getCategories } from "../utils/categoryStorage";

const AdminProducts = ({ products, setProducts }) => {
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  // categories read on render to reflect admin-managed categories

  function handleAdd(data) {
    const updated = addProduct(data);
    setProducts(updated);
    setEditing(null);
  }

  function handleUpdate(id, data) {
    const updated = updateProduct(id, data);
    setProducts(updated);
    setEditing(null);
  }

  function handleDelete(id) {
    const updated = deleteProduct(id);
    setProducts(updated);
  }

  const cats = ["All", ...getCategories()];
  const visibleProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !filterCat || filterCat === "All" ? true : p.category === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <section className="admin-products">
      <div className="products-grid">
        <div className="form-card">
          <h3>{editing ? "Edit Product" : "Add Product"}</h3>
          <ProductForm
            initial={editing}
            onSubmit={(data) => (editing ? handleUpdate(editing.id, data) : handleAdd(data))}
            onCancel={() => setEditing(null)}
            categories={getCategories()}
          />
        </div>

        <div className="table-card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <h3>Existing Products</h3>
            <div style={{display:'flex',gap:8}}>
              <input placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)} />
              <select value={filterCat} onChange={(e)=>setFilterCat(e.target.value)}>
                {cats.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <ProductTable products={visibleProducts} onEdit={(p) => setEditing(p)} onDelete={handleDelete} />
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
