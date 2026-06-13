import React from "react";
import { formatCurrency } from "../utils/formatCurrency";

const ProductTable = ({ products = [], onEdit, onDelete }) => {
  return (
    <div className="product-table-card">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.name} className="table-thumb" />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{formatCurrency(p.price)}</td>
              <td>{p.rating || "—"}</td>
              <td>
                <button className="btn small" onClick={() => onEdit(p)}>Edit</button>
                <button className="btn small danger" onClick={() => onDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
