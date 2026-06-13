import React, { useEffect, useRef } from "react";
import { formatCurrency } from "../utils/formatCurrency";

const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const AdminDashboard = ({ products = [], orders = [] }) => {
  const totalProducts = products.length;
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const totalCategories = categories.length;
  const totalOrders = orders.length || 0;
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const recentProducts = products.slice(0, 5);
  const canvasRefOrders = useRef(null);
  const canvasRefRevenue = useRef(null);

  useEffect(() => {
    let chart1, chart2;
    function createCharts() {
      try {
        const Chart = window.Chart;
        if (!Chart) return;
        const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
        const counts = categories.map((c) => products.filter((p) => p.category === c).length);

        if (canvasRefOrders.current) {
          chart1 = new Chart(canvasRefOrders.current, {
            type: "doughnut",
            data: { labels: categories, datasets: [{ data: counts, backgroundColor: ['#2563eb','#f59e0b','#10b981','#ef4444','#8b5cf6'] }] },
            options: { plugins: { legend: { position: 'bottom' } } }
          });
        }

        if (canvasRefRevenue.current) {
          const months = ['Jan','Feb','Mar','Apr','May','Jun'];
          const data = months.map((m,i)=> Math.round(Math.random()*2000 + i*200));
          chart2 = new Chart(canvasRefRevenue.current, {
            type: 'line',
            data: { labels: months, datasets: [{ label: 'Revenue', data, borderColor:'#f59e0b', backgroundColor:'rgba(245,158,11,0.12)' }]},
            options: { scales: { y: { beginAtZero: true } } }
          });
        }
      } catch(e) {
        // ignore
      }
    }

    if (window.Chart) {
      createCharts();
    } else {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      s.async = true;
      s.onload = () => createCharts();
      s.onerror = () => {};
      document.body.appendChild(s);
    }

    return () => {
      try { chart1 && chart1.destroy(); chart2 && chart2.destroy(); } catch(e){}
    };
  }, [products]);

  return (
    <section className="admin-dashboard">
      <div className="stats-grid">
        <StatCard label="Total Products" value={totalProducts} />
        <StatCard label="Total Categories" value={totalCategories} />
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Revenue" value={formatCurrency(revenue)} />
      </div>

      <div className="recent-activity">
        <h3>Recent Products</h3>
        <div className="recent-list">
          {recentProducts.map((p) => (
            <div key={p.id} className="recent-row">
              <div className="recent-name">{p.name}</div>
              <div className="recent-cat">{p.category}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:18}}>
        <div className="table-card">
          <h4>Product Distribution by Category</h4>
          <canvas ref={canvasRefOrders} style={{width:'100%',height:160}} />
        </div>

        <div className="table-card">
          <h4>Monthly Revenue (sample)</h4>
          <canvas ref={canvasRefRevenue} style={{width:'100%',height:160}} />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
