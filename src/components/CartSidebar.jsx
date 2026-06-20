import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import CartItem from "./CartItem";

const FREE_SHIPPING_THRESHOLD = 10000;

const CartSidebar = () => {
  const { cart, isCartOpen, closeCart, cartTotal } = useCart();

  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 499;
  const progressPercent = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  useEffect(() => {
    if (!isCartOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      <button
        className="cart-overlay open"
        type="button"
        aria-label="Close shopping cart"
        onClick={closeCart}
      />

      <aside
        id="cart-sidebar"
        className="cart-sidebar premium open"
        aria-label="Shopping cart"
        aria-modal="true"
        role="dialog"
      >
        <div className="cart-header premium">
          <h2>Shopping Cart</h2>
          <button
            className="close-btn"
            type="button"
            aria-label="Close shopping cart"
            onClick={closeCart}
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon" aria-hidden="true">
              <ShoppingCart size={56} strokeWidth={1.5} />
            </div>
            <h3>Your cart is empty</h3>
            <p>Add items to get started</p>
          </div>
        ) : (
          <>
            <div className="shipping-promo">
              {cartTotal < FREE_SHIPPING_THRESHOLD ? (
                <>
                  <div className="promo-text">
                    Free shipping on orders over {formatCurrency(FREE_SHIPPING_THRESHOLD)}
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <div className="promo-hint">
                    Add {formatCurrency(amountToFreeShipping)} more for free shipping
                  </div>
                </>
              ) : (
                <div className="promo-success">You qualified for FREE shipping!</div>
              )}
            </div>

            <div className="cart-items premium">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-footer premium">
              <div className="summary-section">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row total">
                  <strong>Order Total</strong>
                  <strong>{formatCurrency(cartTotal + shippingCost)}</strong>
                </div>
              </div>

              <Link to="/checkout" className="checkout-button" onClick={closeCart}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
