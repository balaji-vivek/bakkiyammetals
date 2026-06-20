import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount, isCartOpen, toggleCart } = useCart();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/IMG_4796.jpeg" alt="Bakkiyam Metal Mart" className="brand-logo" onError={(e) => { e.target.style.display = 'none'; }} />
        <span className="brand-title">Bakkiyam Metal Mart</span>
      </div>

      <div style={{ flex: 1 }} />

      <div className="nav-actions">
        <button
          className="cart-button"
          onClick={toggleCart}
          aria-expanded={isCartOpen}
          aria-controls="cart-sidebar"
          type="button"
        >
          <ShoppingCart size={20} />
          <span className="cart-label">Cart</span>

          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
