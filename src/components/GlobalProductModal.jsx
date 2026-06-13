import React, { useEffect, useState } from "react";
import ProductModal from "./ProductModal";

const GlobalProductModal = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    function handler(e) {
      setProduct(e.detail || null);
    }

    window.addEventListener("openProductModal", handler);
    return () => window.removeEventListener("openProductModal", handler);
  }, []);

  return product ? <ProductModal product={product} onClose={() => setProduct(null)} /> : null;
};

export default GlobalProductModal;
