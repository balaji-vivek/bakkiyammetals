import { motion } from "framer-motion";
import { Edit3, Eye, Star, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const ProductTable = ({ products = [], onEdit, onDelete, onView }) => {
  if (!products.length) {
    return (
      <div className="admin-empty-products">
        <h4>No products found</h4>
        <p>Try adjusting search, category, sort, or visibility filters.</p>
      </div>
    );
  }

  return (
    <div className="admin-product-list">
      {products.map((product, index) => {
        const stock = product.stock == null ? null : Number(product.stock);
        const inStock = stock == null || stock > 0;

        return (
          <motion.article
            className="admin-product-row"
            key={product.id}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.28, delay: index * 0.025 }}
            whileHover={{ y: -3 }}
          >
            <div className="admin-product-row__media">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span>{product.name?.charAt(0) || "P"}</span>
              )}
            </div>

            <div className="admin-product-row__main">
              <div className="admin-product-row__title">
                <h4>{product.name}</h4>
                <span className="admin-category-badge">{product.category || "Uncategorized"}</span>
              </div>

              <div className="admin-product-meta">
                <strong>{formatCurrency(product.price)}</strong>
                <span>
                  <Star size={14} fill="currentColor" />
                  {product.rating || 0}
                </span>
                <span className={inStock ? "stock-pill stock-pill--in" : "stock-pill stock-pill--out"}>
                  {inStock ? `${stock == null ? "Available" : `${stock} in stock`}` : "Out of stock"}
                </span>
              </div>

              <div className="admin-product-badges">
                {product.featured && <span className="admin-feature-badge">Featured</span>}
                {product.trending && <span className="admin-trending-badge">Trending</span>}
                {Number(product.discount) > 0 && (
                  <span className="admin-discount-badge">{product.discount}% off</span>
                )}
              </div>
            </div>

            <div className="admin-product-actions">
              <motion.button
                type="button"
                className="admin-action-btn admin-action-btn--view"
                onClick={() => onView(product)}
                whileHover={{ y: -2 }}
              >
                <Eye size={16} />
                View
              </motion.button>
              <motion.button
                type="button"
                className="admin-action-btn admin-action-btn--edit"
                onClick={() => onEdit(product)}
                whileHover={{ y: -2 }}
              >
                <Edit3 size={16} />
                Edit
              </motion.button>
              <motion.button
                type="button"
                className="admin-action-btn admin-action-btn--delete"
                onClick={() => onDelete(product.id)}
                whileHover={{ y: -2 }}
              >
                <Trash2 size={16} />
                Delete
              </motion.button>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default ProductTable;
