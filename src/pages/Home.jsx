import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import CartSidebar from "../components/CartSidebar";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductModal from "../components/ProductModal";
import EmptyState from "../components/EmptyState";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";
import BestSellers from "../components/BestSellers";
import CustomerTrust from "../components/CustomerTrust";

const Home = ({ products }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Navbar />

      <Hero />

      <div className="container">
        <Filters
          searchText={searchText}
          setSearchText={setSearchText}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FeaturedProducts products={products} />

        {products.length === 0 ? (
          <EmptyState title="No products" message="No products available yet. Add from Admin." />
        ) : filteredProducts.length === 0 ? (
          <EmptyState title="No results" message="Try a different search or filter." />
        ) : (
          <section id="products">
            <ProductGrid products={filteredProducts} onView={(p) => setSelectedProduct(p)} />
          </section>
        )}
      </div>

      <BestSellers products={products} />

      <WhyChooseUs />

      <CustomerTrust />

      <Footer />

      <CartSidebar />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
};

export default Home;
