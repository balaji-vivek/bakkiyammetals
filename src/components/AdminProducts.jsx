import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  Filter,
  Flame,
  PackageCheck,
  Search,
  Sparkles,
  Tags,
} from "lucide-react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import { addProduct, updateProduct, deleteProduct } from "../utils/productStorage";
import { getCategories } from "../utils/categoryStorage";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const AdminProducts = ({ products, setProducts }) => {
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [featuredFilter, setFeaturedFilter] = useState("all");

  const categories = getCategories();
  const cats = ["All", ...categories];

  function handleAdd(data) {
    const updated = addProduct(data);
    setProducts(updated);
    setEditing(null);
  }

  function handleUpdate(id, data) {
    const updated = updateProduct(id, data);
    setProducts(updated);
    setEditing(null);
  }

  function handleDelete(id) {
    const updated = deleteProduct(id);
    setProducts(updated);
    if (editing?.id === id) {
      setEditing(null);
    }
  }

  const stats = useMemo(
    () => [
      {
        label: "Total Products",
        value: products.length,
        icon: Boxes,
        tone: "navy",
      },
      {
        label: "Featured Products",
        value: products.filter((product) => product.featured).length,
        icon: Sparkles,
        tone: "gold",
      },
      {
        label: "Trending Products",
        value: products.filter((product) => product.trending).length,
        icon: Flame,
        tone: "blue",
      },
      {
        label: "Categories",
        value: categories.length,
        icon: Tags,
        tone: "green",
      },
    ],
    [products, categories.length]
  );

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesSearch =
          !normalizedSearch ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          (product.category || "").toLowerCase().includes(normalizedSearch);

        const matchesCat = filterCat === "All" || product.category === filterCat;

        const matchesFeatured =
          featuredFilter === "all" ||
          (featuredFilter === "featured" && product.featured) ||
          (featuredFilter === "trending" && product.trending);

        return matchesSearch && matchesCat && matchesFeatured;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return Number(a.price || 0) - Number(b.price || 0);
        if (sortBy === "price-high") return Number(b.price || 0) - Number(a.price || 0);
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return Number(b.id || 0) - Number(a.id || 0);
      });
  }, [products, search, filterCat, featuredFilter, sortBy]);

  return (
    <section className="admin-products premium-admin-products">
      <div className="admin-products-hero">
        <div>
          <p className="admin-kicker">Inventory Control</p>
          <h2>Product Management</h2>
          <p>Manage catalog items, pricing, visibility, and product media from one workspace.</p>
        </div>
        <div className="admin-products-hero__pill">
          <PackageCheck size={18} />
          Live catalog
        </div>
      </div>

      <div className="admin-product-stats">
        {stats.map(({ label, value, icon: Icon, tone }, index) => (
          <motion.div
            className={`admin-stat-card admin-stat-card--${tone}`}
            key={label}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
          >
            <span className="admin-stat-card__icon">
              <Icon size={22} />
            </span>
            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="admin-products-layout">
        <motion.div
          className="admin-product-form-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="admin-card-header">
            <div>
              <p className="admin-kicker">{editing ? "Update item" : "New item"}</p>
              <h3>{editing ? "Edit Product" : "Add Product"}</h3>
            </div>
          </div>
          <ProductForm
            initial={editing}
            onSubmit={(data) => (editing ? handleUpdate(editing.id, data) : handleAdd(data))}
            onCancel={() => setEditing(null)}
            categories={categories}
          />
        </motion.div>

        <motion.div
          className="admin-product-list-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="admin-card-header admin-card-header--split">
            <div>
              <p className="admin-kicker">Catalog</p>
              <h3>Product Management</h3>
            </div>
            <span className="admin-result-count">{visibleProducts.length} shown</span>
          </div>

          <div className="admin-filter-bar">
            <label className="admin-search-field">
              <Search size={18} />
              <input
                placeholder="Search products"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label className="admin-select-field">
              <Filter size={17} />
              <select value={filterCat} onChange={(event) => setFilterCat(event.target.value)}>
                {cats.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-select-field">
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="latest">Sort by latest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name A-Z</option>
              </select>
            </label>

            <label className="admin-select-field">
              <select
                value={featuredFilter}
                onChange={(event) => setFeaturedFilter(event.target.value)}
              >
                <option value="all">All visibility</option>
                <option value="featured">Featured only</option>
                <option value="trending">Trending only</option>
              </select>
            </label>
          </div>

          <ProductTable
            products={visibleProducts}
            onEdit={(product) => setEditing(product)}
            onDelete={handleDelete}
            onView={(product) => setViewing(product)}
          />
        </motion.div>
      </div>

      {viewing && <ProductModal product={viewing} onClose={() => setViewing(null)} />}
    </section>
  );
};

export default AdminProducts;
