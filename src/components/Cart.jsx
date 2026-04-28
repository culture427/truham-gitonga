import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product_cost * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your Cart is Empty</h2>
        <p>Add some bikes to get started!</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Cart</h1>
      <div style={{ display: 'grid', gap: '20px' }}>
        {cart.map((item) => (
          <div key={item.id} style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '8px',
            background: '#fff'
          }}>
            <img
              src={item.product_photo.startsWith('http') ? item.product_photo : `http://gitongatruham.alwaysdata.net/static/images/${item.product_photo}`}
              alt={item.product_name}
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '15px' }}
            />
            <div style={{ flex: 1 }}>
              <h5>{item.product_name}</h5>
              <p>Ksh {item.product_cost}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="btn btn-sm btn-outline-secondary"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="btn btn-sm btn-outline-secondary"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-sm btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <h3 style={{ color: '#007bff' }}>Total: Ksh {total}</h3>
        <button
          onClick={() => navigate('/makepayment', { state: { cart } })}
          className="btn btn-success"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;