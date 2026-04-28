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
            <h3>Revenue</h3>
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
              <tr key={p.id}>
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
    width: "200px",
    height: "100vh",
    background: "#222",
    color: "#fff",
    padding: "20px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  main: {
    flex: 1,
    padding: "20px",
    background: "#f4f4f4",
  },
  statsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    flex: 1,
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },
};

export default Dashboard;