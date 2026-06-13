import React from "react";
import ProductCard from "./ProductCard";

const BestSellers = ({ products = [] }) => {
  // pick top rated or featured items
  const best = products
    .slice()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  return (
    <section className="best-sellers">
      <div className="section-header">
        <h2>Best Sellers</h2>
        <p>Popular picks loved by our customers</p>
      </div>

      <div className="product-grid">
        {best.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
