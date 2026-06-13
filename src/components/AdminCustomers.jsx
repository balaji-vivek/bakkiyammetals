import React, { useEffect, useState } from "react";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("customers") || "[]";
      setCustomers(JSON.parse(raw));
    } catch (e) {
      setCustomers([]);
    }
  }, []);

  return (
    <section className="admin-customers">
      <h3>Customers</h3>
      <div className="table-card">
        {customers.length === 0 ? (
          <p>No customers yet.</p>
        ) : (
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.orders ? c.orders.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminCustomers;
