import React from "react";
import "../App.css";

const AdminSidebar = ({ active = "Dashboard", onSelect = () => {} }) => {
  const items = ["Dashboard", "Products", "Categories", "Orders", "Customers", "Reports", "Settings"];

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <img src="/IMG_4796.jpeg" alt="Bakkiyam Metal Mart" className="admin-logo" onError={(e)=>{e.target.style.display='none'}} />
        <div>
          <div className="brand-name">Bakkiyam Metal Mart</div>
          <div className="brand-sub">Admin</div>
        </div>
      </div>
      <nav>
        {items.map((it) => (
          <button key={it} onClick={() => onSelect(it)} className={`admin-nav-item ${it === active ? "active" : ""}`}>
            {it}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
