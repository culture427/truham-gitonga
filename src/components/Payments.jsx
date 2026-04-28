import { useMemo, useState } from 'react';

const Payments = () => {
  const [payments, setPayments] = useState([
    { id: 1, customer: 'John Mwangi', amount: 42000, method: 'M-Pesa', status: 'Completed', date: '2026-04-20' },
    { id: 2, customer: 'Mary Achieng', amount: 85000, method: 'Card', status: 'Pending', date: '2026-04-22' },
    { id: 3, customer: 'David Ouma', amount: 25000, method: 'M-Pesa', status: 'Completed', date: '2026-04-24' },
  ]);
  const [search, setSearch] = useState('');

  const filteredPayments = useMemo(
    () =>
      payments.filter(
        (payment) =>
          payment.customer.toLowerCase().includes(search.toLowerCase()) ||
          payment.method.toLowerCase().includes(search.toLowerCase()) ||
          payment.status.toLowerCase().includes(search.toLowerCase())
      ),
    [payments, search]
  );

  const toggleStatus = (id) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: payment.status === 'Pending' ? 'Completed' : 'Pending',
            }
          : payment
      )
    );
  };

  const totals = payments.reduce(
    (acc, payment) => {
      acc.count += 1;
      acc.totalAmount += payment.amount;
      if (payment.status === 'Completed') acc.completed += 1;
      if (payment.status === 'Pending') acc.pending += 1;
      return acc;
    },
    { count: 0, totalAmount: 0, completed: 0, pending: 0 }
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Payments</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={styles.card}>
          <h4>Total Payments</h4>
          <p>{totals.count}</p>
        </div>
        <div style={styles.card}>
          <h4>Total Revenue</h4>
          <p>KES {totals.totalAmount.toLocaleString()}</p>
        </div>
        <div style={styles.card}>
          <h4>Completed</h4>
          <p>{totals.completed}</p>
        </div>
        <div style={styles.card}>
          <h4>Pending</h4>
          <p>{totals.pending}</p>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search payments by customer, method, or status"
          style={styles.search}
        />
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.customer}</td>
                <td>KES {payment.amount.toLocaleString()}</td>
                <td>{payment.method}</td>
                <td>{payment.date}</td>
                <td>{payment.status}</td>
                <td>
                  <button style={styles.button} onClick={() => toggleStatus(payment.id)}>
                    {payment.status === 'Pending' ? 'Mark Completed' : 'Mark Pending'}
                  </button>
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
  button: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #16a34a',
    background: '#16a34a',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Payments;
