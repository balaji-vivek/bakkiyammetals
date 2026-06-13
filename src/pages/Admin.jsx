import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminDashboard from "../components/AdminDashboard";
import AdminProducts from "../components/AdminProducts";
import AdminCategories from "../components/AdminCategories";
import AdminOrders from "../components/AdminOrders";
import AdminCustomers from "../components/AdminCustomers";
import AdminReports from "../components/AdminReports";
import AdminSettings from "../components/AdminSettings";

const Admin = ({ products, setProducts }) => {
  const [section, setSection] = useState("Dashboard");

  return (
    <div className="admin-root">
      <AdminSidebar active={section} onSelect={(s) => setSection(s)} />

      <main className="admin-main">
        <header className="admin-header">
          <h1>Bakkiyam Metal Mart Admin</h1>
        </header>

        {section === "Dashboard" && <AdminDashboard products={products} />}
        {section === "Products" && <AdminProducts products={products} setProducts={setProducts} />}
        {section === "Categories" && <AdminCategories />}
        {section === "Orders" && <AdminOrders />}
        {section === "Customers" && <AdminCustomers />}
        {section === "Reports" && <AdminReports products={products} />}
        {section === "Settings" && <AdminSettings />}
      </main>
    </div>
  );
};

export default Admin;
