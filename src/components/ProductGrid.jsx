import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onView = () => {} }) => {
  if (products.length === 0) {
    return <p className="empty-message">No products found.</p>;
  }

  return (
    <main className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onView={onView} />
      ))}
    </main>
  );
};

export default ProductGrid;