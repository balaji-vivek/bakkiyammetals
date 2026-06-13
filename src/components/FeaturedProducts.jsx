import ProductCard from "./ProductCard";

const FeaturedProducts = ({ products }) => {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="featured container">
      <h2>Featured Products</h2>
      <div className="featured-grid">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
