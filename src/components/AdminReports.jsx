import React from "react";

const AdminReports = ({ products = [] }) => {
  const byCategory = products.reduce((acc, p) => {
    const cat = p.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="admin-reports">
      <h3>Reports</h3>
      <div className="reports-grid">
        <div className="report-card">
          <h4>Products by Category</h4>
          <ul>
            {Object.entries(byCategory).map(([cat, count]) => (
              <li key={cat}>{cat}: {count}</li>
            ))}
          </ul>
        </div>

        <div className="report-card">
          <h4>Revenue Summary</h4>
          <p>Placeholder for revenue cards and analytics</p>
        </div>
      </div>
    </section>
  );
};

export default AdminReports;
