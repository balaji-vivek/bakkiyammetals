import { useEffect, useState } from "react";

const ProductForm = ({ initial = null, onSubmit, onCancel, categories = [] }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    rating: "",
    description: "",
    discount: "",
    featured: false,
    trending: false,
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        category: initial.category || "",
        price: initial.price != null ? String(initial.price) : "",
        image: initial.image || "",
        rating: initial.rating != null ? String(initial.rating) : "",
        description: initial.description || "",
        discount: initial.discount != null ? String(initial.discount) : "",
        featured: !!initial.featured,
        trending: !!initial.trending,
      });
    }
  }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      category: form.category,
      price: Math.round(Number(parseFloat(form.price || 0) * 100)),
      image: form.image,
      rating: Number(form.rating) || 0,
      description: form.description,
      discount: Number(form.discount) || 0,
      featured: !!form.featured,
      trending: !!form.trending,
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={submit} className="product-form modern">
      <div className="form-row">
        <div className="field">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Category</label>
          {categories && categories.length ? (
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Choose...</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : (
            <input name="category" value={form.category} onChange={handleChange} required />
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Price (INR)</label>
          <input name="price" value={form.price} onChange={handleChange} placeholder="0.00" required />
        </div>

        <div className="field">
          <label>Rating</label>
          <input name="rating" value={form.rating} onChange={handleChange} placeholder="0-5" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} />
        </div>

        <div className="preview">
          <label>Preview</label>
          <div className="image-preview">
            {form.image ? <img src={form.image} alt="preview" /> : <div className="image-placeholder">No image</div>}
          </div>
        </div>
      </div>

      <div>
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} />
      </div>

      <div className="form-row">
        <div className="field">
          <label>Discount (%)</label>
          <input name="discount" value={form.discount} onChange={handleChange} />
        </div>

        <div className="toggles">
          <label>
            <input type="checkbox" name="featured" checked={form.featured} onChange={(e) => setForm((s) => ({ ...s, featured: e.target.checked }))} /> Featured
          </label>
          <label>
            <input type="checkbox" name="trending" checked={form.trending} onChange={(e) => setForm((s) => ({ ...s, trending: e.target.checked }))} /> Trending
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn primary">Save product</button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
