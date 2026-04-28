import { useMemo, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Mwangi', product: 'Mountain Bike', total: 42000, status: 'Pending', date: '2026-04-20' },
    { id: 2, customer: 'Mary Achieng', product: 'Electric Bike', total: 85000, status: 'Processing', date: '2026-04-22' },
    { id: 3, customer: 'David Ouma', product: 'City Commuter Bike', total: 25000, status: 'Shipped', date: '2026-04-24' },
  ]);
  const [search, setSearch] = useState('');

  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.customer.toLowerCase().includes(search.toLowerCase()) ||
          order.product.toLowerCase().includes(search.toLowerCase()) ||
          order.status.toLowerCase().includes(search.toLowerCase())
      ),
    [orders, search]
  );

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order
      )
    );
  };

  const totals = orders.reduce(
    (acc, order) => {
      acc.count += 1;
      acc.totalAmount += order.total;
      if (order.status === 'Pending') acc.pending += 1;
      if (order.status === 'Shipped') acc.shipped += 1;
      return acc;
    },
    { count: 0, totalAmount: 0, pending: 0, shipped: 0 }
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Orders</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={styles.card}>
          <h4>Total Orders</h4>
          <p>{totals.count}</p>
        </div>
        <div style={styles.card}>
          <h4>Total Sales</h4>
          <p>KES {totals.totalAmount.toLocaleString()}</p>
        </div>
        <div style={styles.card}>
          <h4>Pending</h4>
          <p>{totals.pending}</p>
        </div>
        <div style={styles.card}>
          <h4>Shipped</h4>
          <p>{totals.shipped}</p>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders by customer, product, or status"
          style={styles.search}
        />
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>KES {order.total.toLocaleString()}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={styles.select}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '18px',
    minWidth: '180px',
  },
  search: {
    width: '100%',
    maxWidth: '420px',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
  },
  tableWrapper: {
    overflowX: 'auto',
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '760px',
  },
  select: {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    background: '#f9fafb',
  },
};

export default Orders;
