import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
    window.location.reload();
  };

  return (
    <div className="sidebar">

      <h2 className="sidebar-title">🚴 Bike Chat</h2>

      <NavLink to="/" className="nav-link">Products</NavLink>
      <NavLink to="/addproduct" className="nav-link">Add Product</NavLink>
      <NavLink to="/about" className="nav-link">About</NavLink>
      <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
      <NavLink to="/chat" className="nav-link">Chat</NavLink>
      <NavLink to="/orders" className="nav-link">Orders</NavLink>
      <NavLink to="/users" className="nav-link">Users</NavLink>
      <NavLink to="/payments" className="nav-link">Payments</NavLink>
      {isLoggedIn ? (
        <button className="nav-link nav-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <NavLink to="/signin" className="nav-link">Login</NavLink>
          <NavLink to="/signup" className="nav-link">Signup</NavLink>
        </>
      )}

    </div>
  );
};

export default Sidebar;