import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const {product} = useLocation().state || {}
    const img_url = "http://gitongatruham.alwaysdata.net/static/images/"
    const [phone, setPhone,] = useState('')
    const [message, setMessage] = useState('')
    const [error, SetError] = useState('')

    const submit = async (e) => {
        e.preventDefault ()
        setMessage('please wait as we process...')
        try {
            const data = new FormData()
            data.append('phone', phone)
            data.append('amount', product.product_cost)

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

      <div className='image-wrapper'>
        <img src= {img_url + product.product_photo} alt="" />
      </div>

      <div className='product-tags'>
        <p className='tag success'>Product: {product.product_name}</p>
        <p className='tag warning'>Description: {product.product_description}</p>
        <p className='tag danger'>Cost: {product.product_cost} KES</p>
      </div>

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
