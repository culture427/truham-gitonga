import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const location = useLocation();
    const { product, cart } = location.state || {};
    const img_url = "http://gitongatruham.alwaysdata.net/static/images/"
    const [phone, setPhone,] = useState('')
    const [message, setMessage] = useState('')
    const [error, SetError] = useState('')

    const items = cart || [product];
    const totalAmount = items.reduce((sum, item) => sum + item.product_cost * (item.quantity || 1), 0);

    const submit = async (e) => {
        e.preventDefault ()
        setMessage('please wait as we process...')
        try {
            const data = new FormData()
            data.append('phone', phone)
            data.append('amount', totalAmount)

            const response = await axios.post(
              'http://gitongatruham.alwaysdata.net/api/mpesa_payment', 
              data
            )

            setMessage('please complete the payment in your phone')
        } catch (error) {
            setMessage('')
            SetError(error.message)
        }
    }

  return (
    <div className='mpesa-page col-md-12 justify-content-center mb-4 mt-4 row'>

        <div className='mpesa-card col-md-6 card shadow p-8'>

      <h1 className='mpesa-title'> Make Payment - Lipa na M-Pesa</h1>

      {cart ? (
        <div>
          <h3>Cart Items:</h3>
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img src={item.product_photo.startsWith('http') ? item.product_photo : img_url + item.product_photo} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
              <div>
                <p>{item.product_name} (x{item.quantity || 1})</p>
                <p>{item.product_cost * (item.quantity || 1)} KES</p>
              </div>
            </div>
          ))}
          <p style={{ color: '#007bff', fontWeight: 'bold' }}>Total: {totalAmount} KES</p>
        </div>
      ) : (
        <>
          <div className='image-wrapper'>
            <img src={product.product_photo.startsWith('http') ? product.product_photo : img_url + product.product_photo} alt="" />
          </div>

          <div className='product-tags'>
            <p className='tag success'>Product: {product.product_name}</p>
            <p className='tag warning'>Description: {product.product_description}</p>
            <p className='tag danger'>Cost: {product.product_cost} KES</p>
          </div>
        </>
      )}

      <form action="" onSubmit={submit} className='mpesa-form'>

        {message && <div className='msg success'>{message}</div>}
        {error && <div className='msg error'>{error}</div>}

        <input 
          type="tel"
          placeholder='Enter phone number (+254...)'
          className='mpesa-input'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type='submit' className='mpesa-btn'>
           Lipa na M-Pesa
        </button>

      </form>

    </div>
    </div>
  )
}

export default Makepayment
