import React from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const inStock = product.stock == null ? true : product.stock > 0;

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <div className="left">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="right">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {product.featured && <span className="modal-badge">Featured</span>}
              {product.trending && <span className="modal-badge">Trending</span>}
            </div>
            <h2 style={{ marginTop: 6 }}>{product.name}</h2>
            <div className="meta">{product.category} • Rating: {product.rating || 0}</div>
          </div>

          <div>
            <div className="price">{formatCurrency(product.price)}</div>
            <p style={{ color: "#6b7280", marginTop: 10 }}>{product.description}</p>
            <div style={{ marginTop: 8, fontWeight: 700, color: inStock ? "#047857" : "#b91c1c" }}>
              {inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <div className="modal-actions">
            <button
              className="btn primary"
              onClick={() => {
                addToCart(product);
                if (onClose) onClose();
              }}
              disabled={!inStock}
            >
              Add to cart
            </button>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
