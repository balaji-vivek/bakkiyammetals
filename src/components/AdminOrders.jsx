import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("orders") || "[]";
      setOrders(JSON.parse(raw));
    } catch (e) {
      setOrders([]);
    }
  }, []);

  const totalOrders = orders.length;
  const revenue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0);
  const pending = orders.filter((o) => (o.status || "Pending") === "Pending").length;
  const completed = orders.filter((o) => (o.status || "Pending") === "Completed").length;

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const sampleOrders = months.map((m,i) => ({ m, v: Math.max(1, Math.round(Math.random()*30 + i)) }));
  const sampleRevenue = months.map((m,i) => ({ m, v: Math.round(Math.random()*2000 + i*100) }));

  return (
    <section className="admin-orders">
      <h3>Orders</h3>

      <div className="orders-stats">
        <div className="orders-card">
          <h4>Total Orders</h4>
          <div className="value">{totalOrders}</div>
        </div>
        <div className="orders-card">
          <h4>Revenue</h4>
          <div className="value">₹{revenue}</div>
        </div>
        <div className="orders-card">
          <h4>Pending</h4>
          <div className="value">{pending}</div>
        </div>
        <div className="orders-card">
          <h4>Completed</h4>
          <div className="value">{completed}</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="table-card">
          <h4>Orders</h4>
          {orders.length === 0 ? <p>No orders yet.</p> : (
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name} ({o.phone})</td>
                    <td>{o.total}</td>
                    <td>{o.status || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="table-card">
          <h4>Charts (sample)</h4>
          <div style={{padding:12}}>
            <div style={{marginBottom:12}}><strong>Orders by Month</strong></div>
            <svg width="100%" height="60" viewBox="0 0 120 60" preserveAspectRatio="none">
              {sampleOrders.map((s, i) => {
                const x = (i / (sampleOrders.length - 1)) * 120;
                const y = 60 - (s.v / 60) * 50;
                return <circle key={s.m} cx={x} cy={y} r={1.6} fill="#2563eb" />;
              })}
            </svg>

            <div style={{marginTop:14, marginBottom:6}}><strong>Revenue by Month</strong></div>
            <svg width="100%" height="60" viewBox="0 0 120 60" preserveAspectRatio="none">
              {sampleRevenue.map((s, i) => {
                const x = (i / (sampleRevenue.length - 1)) * 120;
                const y = 60 - (s.v / 3000) * 50;
                return <rect key={s.m} x={x-1.5} y={y} width={3} height={60-y} fill="#f59e0b" />;
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrders;
