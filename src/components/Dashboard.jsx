import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2>🚴 Admin</h2>
        <ul style={styles.menu}>
          <li>Dashboard</li>
          <li>Products</li>
          <li>Orders</li>
          <li>Users</li>
          <li>Payments</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <h1>Dashboard</h1>

        {/* Stats */}
        <div style={styles.statsContainer}>
          <div style={styles.card}>
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>

          <div style={styles.card}>
            <h3>Orders</h3>
            <p>12</p>
          </div>

          <div style={styles.card}>
            <h3>Users</h3>
            <p>18</p>
          </div>

          <div style={styles.card}>
            <h3>Payments</h3>
            <p>KES 45,000</p>
          </div>
        </div>

        {/* Product Table */}
        <h2>Recent Products</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id || p._id || p.product_name}>
                <td>{p.product_name}</td>
                <td>KES {p.product_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    background: "#111827",
    color: "#fff",
    padding: "24px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    marginTop: "24px",
  },
  main: {
    flex: 1,
    padding: "24px",
    background: "#0f172a",
    color: "#f8fafc",
  },
  statsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "24px",
  },
  card: {
    background: "#1f2937",
    padding: "24px",
    borderRadius: "16px",
    flex: 1,
    minWidth: "180px",
    textAlign: "center",
    color: "#f8fafc",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#111827",
    color: "#f8fafc",
    borderRadius: "16px",
    overflow: "hidden",
  },
};

export default Dashboard;