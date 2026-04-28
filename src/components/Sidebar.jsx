import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2 className="sidebar-title">🚴 Bike Chat</h2>

      <NavLink to="/" className="nav-link">Products</NavLink>
      <NavLink to="/addproduct" className="nav-link">Add Product</NavLink>
      <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
      <NavLink to="/chat" className="nav-link">Chat</NavLink>
      <NavLink to="/orders" className="nav-link">Orders</NavLink>
      <NavLink to="/users" className="nav-link">Users</NavLink>
      <NavLink to="/payments" className="nav-link">Payments</NavLink>
      <NavLink to="/signin" className="nav-link">Login</NavLink>
      <NavLink to="/signup" className="nav-link">Signup</NavLink>

    </div>
  );
};

export default Sidebar;