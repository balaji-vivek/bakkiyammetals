import { Search } from "lucide-react";
import { getCategories } from "../utils/categoryStorage";

const Filters = ({
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
}) => {
  const cats = ["All", ...getCategories()];

  return (
    <section className="filters">
      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {cats.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Filters;