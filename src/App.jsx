import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import "./App.css";
import { getProducts, saveProducts } from "./utils/productStorage";
import GlobalProductModal from "./components/GlobalProductModal";

function App() {
  const [products, setProducts] = useState(() => getProducts());

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  return (
    <CartProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home products={products} setProducts={setProducts} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin products={products} setProducts={setProducts} />} />
          </Routes>
        </BrowserRouter>
        <GlobalProductModal />
      </ErrorBoundary>
    </CartProvider>
  );
}

export default App;