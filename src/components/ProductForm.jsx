import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgePercent,
  Boxes,
  ImagePlus,
  IndianRupee,
  Layers,
  Link as LinkIcon,
  Package,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

const DESCRIPTION_LIMIT = 220;

const emptyForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
  rating: "",
  description: "",
  discount: "",
  featured: false,
  trending: false,
};

const ProductForm = ({ initial = null, onSubmit, onCancel, categories = [] }) => {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        category: initial.category || "",
        price: initial.price != null ? String(Number(initial.price) / 100) : "",
        stock: initial.stock != null ? String(initial.stock) : "",
        image: initial.image || "",
        rating: initial.rating != null ? String(initial.rating) : "",
        description: initial.description || "",
        discount: initial.discount != null ? String(initial.discount) : "",
        featured: !!initial.featured,
        trending: !!initial.trending,
      });
      return;
    }

    setForm(emptyForm);
  }, [initial]);

  const previewPrice = useMemo(
    () => Math.round(Number(parseFloat(form.price || 0) * 100)),
    [form.price]
  );

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    updateField(name, value);
  }

  function handleImageFile(file) {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateField("image", String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    handleImageFile(event.dataTransfer.files?.[0]);
  }

  function submit(event) {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: previewPrice,
      stock: Number(form.stock) || 0,
      image: form.image,
      rating: Number(form.rating) || 0,
      description: form.description.trim(),
      discount: Number(form.discount) || 0,
      featured: !!form.featured,
      trending: !!form.trending,
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={submit} className="admin-product-form">
      <div className="admin-form-grid">
        <label className="admin-field admin-field--wide">
          <span>Product Name</span>
          <div className="admin-input-shell">
            <Package size={18} />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Premium steel pressure cooker"
              required
            />
          </div>
        </label>

        <label className="admin-field">
          <span>Category</span>
          <div className="admin-input-shell">
            <Layers size={18} />
            {categories.length ? (
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Choose category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : (
              <input name="category" value={form.category} onChange={handleChange} required />
            )}
          </div>
        </label>

        <label className="admin-field">
          <span>Price</span>
          <div className="admin-input-shell">
            <IndianRupee size={18} />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="1299"
              inputMode="decimal"
              required
            />
          </div>
        </label>

        <label className="admin-field">
          <span>Stock Quantity</span>
          <div className="admin-input-shell">
            <Boxes size={18} />
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="25"
              inputMode="numeric"
            />
          </div>
        </label>

        <label className="admin-field">
          <span>Rating</span>
          <div className="admin-input-shell">
            <Star size={18} />
            <input
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="4.8"
              inputMode="decimal"
            />
          </div>
        </label>

        <label className="admin-field">
          <span>Discount</span>
          <div className="admin-input-shell">
            <BadgePercent size={18} />
            <input
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="10"
              inputMode="numeric"
            />
          </div>
        </label>
      </div>

      <div className="admin-image-section">
        <div className="admin-field-label">Product Image</div>
        <div
          className={`admin-image-dropzone ${isDragging ? "is-dragging" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {form.image ? (
            <div className="admin-upload-preview">
              <img src={form.image} alt="Product preview" />
              <button
                type="button"
                className="admin-remove-image"
                onClick={() => updateField("image", "")}
              >
                <Trash2 size={16} />
                Remove image
              </button>
            </div>
          ) : (
            <div className="admin-upload-empty">
              <span>
                <UploadCloud size={28} />
              </span>
              <strong>Drop product image here</strong>
              <p>Upload a JPG, PNG, or paste an image URL below.</p>
              <button type="button" onClick={() => fileInputRef.current?.click()}>
                <ImagePlus size={17} />
                Choose image
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => handleImageFile(event.target.files?.[0])}
          />
        </div>

        <label className="admin-field admin-url-field">
          <span>Image URL</span>
          <div className="admin-input-shell">
            <LinkIcon size={18} />
            <input
              name="image"
              value={form.image.startsWith("data:") ? "" : form.image}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
            />
          </div>
        </label>
      </div>

      <label className="admin-field">
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={(event) =>
            updateField("description", event.target.value.slice(0, DESCRIPTION_LIMIT))
          }
          placeholder="Describe material, capacity, finish, and use case."
        />
        <small>
          {form.description.length}/{DESCRIPTION_LIMIT} characters
        </small>
      </label>

      <div className="admin-toggle-row">
        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => updateField("featured", event.target.checked)}
          />
          Featured product
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.trending}
            onChange={(event) => updateField("trending", event.target.checked)}
          />
          Trending product
        </label>
      </div>

      <motion.div className="admin-product-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="admin-product-preview__image">
          {form.image ? <img src={form.image} alt={form.name || "Product"} /> : <ImagePlus size={34} />}
        </div>
        <div>
          <p>{form.category || "Category"}</p>
          <h4>{form.name || "Product preview"}</h4>
          <strong>{formatCurrency(previewPrice)}</strong>
        </div>
      </motion.div>

      <div className="admin-form-actions">
        <motion.button whileHover={{ y: -2 }} type="submit" className="admin-primary-btn">
          {initial ? "Update product" : "Save product"}
        </motion.button>
        <button type="button" className="admin-secondary-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
