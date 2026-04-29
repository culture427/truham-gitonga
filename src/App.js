import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Addproduct from "./components/Addproduct";
import AboutUs from "./components/AboutUs";
import Getproduct from "./components/Getproduct";
import Makepayment from "./components/Makepayment";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Payments from "./components/Payments";
import Chat from "./components/Chat";

import CartProvider from "./components/CartContext";
import MainLayout from "./layout/MainLayout";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <div className="splash-screen" onClick={() => setShowSplash(false)}>
        <div className="splash-content">
          <div className="app-icon">
            <span className="b1">B</span><span className="b2">B</span>
          </div>
          <div className="app-description">Bicycle Brejin</div>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App bg-dark min-vh-100 d-flex flex-column">

          <Routes>

            <Route element={<MainLayout />}>
              <Route path="/" element={<Getproduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/addproduct" element={<Addproduct />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/makepayment" element={<Makepayment />} />
            </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

          </Routes>

          <Footer />

        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;