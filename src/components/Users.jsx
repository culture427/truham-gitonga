import { useMemo, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Janet Odhiambo', email: 'janet@example.com', role: 'Customer', status: 'Active', joined: '2026-01-15' },
    { id: 2, name: 'Peter Njoroge', email: 'peter@example.com', role: 'Admin', status: 'Active', joined: '2025-10-29' },
    { id: 3, name: 'Grace Wanjiru', email: 'grace@example.com', role: 'Customer', status: 'Suspended', joined: '2026-02-05' },
  ]);
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'Active' ? 'Suspended' : 'Active',
            }
          : user
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Users</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={styles.card}>
          <h4>Total Users</h4>
          <p>{users.length}</p>
        </div>
        <div style={styles.card}>
          <h4>Active</h4>
          <p>{users.filter((user) => user.status === 'Active').length}</p>
        </div>
        <div style={styles.card}>
          <h4>Suspended</h4>
          <p>{users.filter((user) => user.status === 'Suspended').length}</p>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name, email, or role"
          style={styles.search}
        />
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.joined}</td>
                <td>
                  <button style={styles.button} onClick={() => toggleStatus(user.id)}>
                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
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
    border: '1px solid #2563eb',
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Users;
