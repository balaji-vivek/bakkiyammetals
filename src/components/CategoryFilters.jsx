import { Smartphone, Shirt, Home, Box } from "lucide-react";

  const iconMap = {
    Electronics: <Smartphone size={16} />,
    Fashion: <Shirt size={16} />,
    Home: <Home size={16} />,
  };

const CategoryFilters = ({ categories, selected, onSelect }) => {
  return (
    <div className="category-filters">
      {categories.map((c) => (
        <button
          key={c}
          className={`category-chip ${selected === c ? "active" : ""}`}
          onClick={() => onSelect(c)}
        >
          <span className="icon">{iconMap[c] || <Box size={16} />}</span>
          <span>{c}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;
