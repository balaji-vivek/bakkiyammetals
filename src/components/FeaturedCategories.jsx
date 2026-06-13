import React from "react";
import { Package } from "lucide-react";
import { getCategories } from "../utils/categoryStorage";

const FeaturedCategories = () => {
  const categories = getCategories().slice(0, 10);

  return (
    <section className="featured-categories">
      <div className="section-header">
        <h2>Shop by Category</h2>
        <p>Explore our premium collection of household products</p>
      </div>

      <div className="categories-grid">
        {categories.map((name, idx) => {
          return (
            <div key={name} className="category-card">
              <div className="category-icon" style={{ backgroundColor: '#2563eb22' }}>
                <Package size={32} color={'#2563eb'} />
              </div>
              <h3>{name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCategories;
