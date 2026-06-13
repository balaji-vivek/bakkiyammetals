import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { Star } from "lucide-react";

const ProductCard = ({ product, onView = () => {} }) => {
  const { addToCart } = useCart();

  const hasDiscount = product.discount && Number(product.discount) > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.price * (1 - Number(product.discount) / 100))
    : product.price;

  return (
    <div className="product-card modern">
      <div className="image-wrap">
        {product.trending && <span className="badge trending">Trending</span>}
        {product.featured && <span className="badge featured">Featured</span>}
        {hasDiscount && <span className="badge discount">-{product.discount}%</span>}
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>

        <div className="rating">
          <Star size={14} /> <span>{product.rating || 0}</span>
        </div>

        <p className="description">{product.description}</p>

        <div className="product-footer">
          <div className="price-row">
            {hasDiscount ? (
              <>
                <span className="price">{formatCurrency(discountedPrice)}</span>
                <span className="price-old">{formatCurrency(product.price)}</span>
              </>
            ) : (
              <span className="price">{formatCurrency(product.price)}</span>
            )}
          </div>

          <div className="actions">
            <button className="quick-add" onClick={() => addToCart(product)}>
              Quick Add
            </button>
            <button
              className="details"
              onClick={() => {
                try {
                  if (onView) onView(product);
                  // also emit a global event so other sections work without prop wiring
                  window.dispatchEvent(new CustomEvent("openProductModal", { detail: product }));
                } catch (e) {}
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;