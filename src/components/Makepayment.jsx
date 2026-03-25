 import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const {product} = useLocation().state || {}
    const img_url = "http://gitongatruham.alwaysdata.net/static/images/"
    const [phone, setPhone,] = useState('')
    const [message, setMessage] = useState('')
    const [error, SetError] = useState('')
    // function for makepayment
    const submit = async (e) => {
        // preventing the default loading behaviour of a form
        e.preventDefault ()
        // set message
        setMessage('please wait as we process...')
        // connecting axios to flask api endpoint
        try {
            // attaching user inputs to data variable
            const data = new FormData()
            data.append('phone', phone)
            data.append('amount', product.product_cost)
            // posting data to the database
            const response = await axios.post('http://gitongatruham.alwaysdata.net/api/mpesa_payment', data)
            // update the message
            setMessage('please complete the payment in your phone')
        } catch (error) {
            setMessage('')
            SetError(error.message)
        }
    }
  return (
    <div className='col-md-12 justify-content-center mb-4 mt-4 row'>
        <div className='col-md-6 card shadow p-8'>
      <h1>Makepayment-Lipa na Mpesa</h1>
      <img src= {img_url + product.product_photo} alt="" />
      <p className='btn btn-success'>the product name is: {product.product_name}</p>
      <p className='btn btn-warning'>the product description is: {product.product_description}</p>
      <p className='btn btn-danger'>the product cost is: {product.product_cost}</p>
      <form action="" onSubmit={submit}>
        {message}
        {error}
        <input type="tel" placeholder='enter phone 254' className='btn btn-dark' value={phone}  onChange={(e) => setPhone(e.target.value)}/><br /><br />
        <button type='submit' className='text-success bg-dark'>Lipa na pochi</button>
      </form>
    </div>
    </div>
  )
}

export default Makepayment
