import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

const MainLayout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="layout-wrapper">

      <Sidebar />

      <div className="chat-area">

        <div className="top-bar">
          <input
            placeholder="Search bicycles..."
            className="search-input"
          />
          <div className="cart-icon" onClick={() => navigate('/cart')}>
            🛒 Cart ({cart.length})
          </div>
        </div>

        <div className="content-area">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default MainLayout;