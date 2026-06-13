import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const itemTotal = item.price * item.quantity;
  const discountAmount = item.discount ? Math.round((itemTotal * item.discount) / 100) : 0;
  const savings = discountAmount > 0 ? discountAmount : 0;
  const finalPrice = itemTotal - savings;

  return (
    <div className="cart-item premium">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="item-details">
        <div className="item-header">
          <h4>{item.name}</h4>
          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
            <Trash2 size={18} />
          </button>
        </div>

        <div className="item-price-row">
          <span className="price-label">Price:</span>
          <span className="price-value">{formatCurrency(item.price)}</span>
        </div>

        {savings > 0 && (
          <div className="savings-badge">
            Save {formatCurrency(savings)}
          </div>
        )}

        <div className="item-controls">
          <div className="quantity-group">
            <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>
              <Minus size={16} />
            </button>
            <span className="qty-display">{item.quantity}</span>
            <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="item-total">
        {savings > 0 && <div className="original-total" style={{ textDecoration: "line-through", color: "#9ca3af", fontSize: "12px" }}>{formatCurrency(itemTotal)}</div>}
        <div className="final-total">{formatCurrency(finalPrice)}</div>
      </div>
    </div>
  );
};

export default CartItem;