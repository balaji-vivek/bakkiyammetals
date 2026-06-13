import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { ShoppingCart, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import "./Checkout.css";

const Checkout = () => {
  const { cart, cartTotal, removeFromCart } = useCart();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("cod");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill all required fields");
      return;
    }
    setOrderPlaced(true);
  };

  const shippingCost = cartTotal >= 10000 ? 0 : 499;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + shippingCost + tax;

  if (!cart || cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="checkout-empty">
          <ShoppingCart size={64} />
          <h2>Your cart is empty</h2>
          <p>Add items before proceeding to checkout</p>
          <a href="/" className="btn primary">Continue Shopping</a>
        </div>
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="order-success">
          <div className="success-content">
            <CheckCircle size={80} color="#10b981" />
            <h1>Order Placed Successfully!</h1>
            <p className="order-id">Order ID: #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <div className="success-details">
              <p>Thank you for your order, {formData.name}!</p>
              <p>A confirmation email has been sent to {formData.email}</p>
              <p>Delivery expected in 3-5 business days</p>
            </div>
            <div className="success-actions">
              <a href="/" className="btn primary">Continue Shopping</a>
              <a href="/admin" className="btn">View Orders</a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="checkout-container">
          {/* Progress Bar */}
          <div className="progress-steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <p>Information</p>
            </div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <p>Shipping</p>
            </div>
            <div className={`step ${step >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <p>Payment</p>
            </div>
          </div>

          <div className="checkout-content">
            {/* Left Section - Forms */}
            <div className="checkout-form">
              {/* Step 1: Customer Information */}
              {step === 1 && (
                <div className="form-section">
                  <h2>Customer Information</h2>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Address */}
              {step === 2 && (
                <div className="form-section">
                  <h2>Delivery Address</h2>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {step === 3 && (
                <div className="form-section">
                  <h2>Select Payment Method</h2>
                  <div className="payment-options">
                    {[
                      { id: "cod", label: "Cash on Delivery", icon: "🚚" },
                      { id: "upi", label: "UPI (Google Pay, PhonePe)", icon: "📱" },
                      { id: "card", label: "Credit/Debit Card", icon: "💳" },
                      { id: "netbanking", label: "Net Banking", icon: "🏦" }
                    ].map((method) => (
                      <label key={method.id} className="payment-option">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={payment === method.id}
                          onChange={(e) => setPayment(e.target.value)}
                        />
                        <span className="payment-icon">{method.icon}</span>
                        <span className="payment-label">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {step > 1 && (
                  <button className="btn secondary" onClick={() => setStep(step - 1)}>
                    Back
                  </button>
                )}
                {step < 3 && (
                  <button className="btn primary" onClick={() => setStep(step + 1)}>
                    Continue
                  </button>
                )}
                {step === 3 && (
                  <button className="btn primary" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                )}
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>

              {/* Cart Items */}
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="summary-divider" />

              {/* Cost Breakdown */}
              <div className="cost-breakdown">
                <div className="cost-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="cost-row">
                  <span>Tax (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="cost-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}</span>
                </div>
              </div>

              <div className="summary-divider" />

              <div className="cost-row total">
                <span>Order Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              {/* Free Shipping Badge */}
              {cartTotal >= 10000 && (
                <div className="free-shipping-badge">
                  ✓ You qualified for FREE shipping!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
