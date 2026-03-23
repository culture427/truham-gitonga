 import React, { useState } from 'react'
import axios from 'axios'

const Addproduct = () => {
    // states for inputs
  const [product_name, setProduct_name] = useState('')
  const [product_description, setProduct_description] = useState('')
  const [product_cost, setProduct_cost] = useState('')
  const [product_photo, setProduct_photo] = useState('')
  // states for the loading error and success
  const [loading, setLoading] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  // posting user inputs to the database
  const submit = async (e) => {
    // preventing reloading of the page
    e.preventDefault()
    setLoading('please wait a moment as we process your request')
    // send user inputs to the database
    try {
      const data = new FormData()
      // appending data to the new formdata variable
      data.append('product_name', product_name)
      data.append('product_description', product_description)
      data.append('product_cost', product_cost)
       data.append('product_photo', product_photo)
      // using axios to post the data into the database
      const response = await axios.post ('http://gitongatruham.alwaysdata.net/api/add_product' , data)
      // removing the loading message by setting it to empty
            setLoading('')
            // adding success message after successful data posting in the database
            setSuccess(response.data.message)
            // clearing the form fields making the work easy for the user
            product_name('')
            product_cost('')
            product_description('')
            product_photo('')
    } catch (error) {
        setLoading('')
        setError(error.message)
    }

  }
  return (
    <div className="row mt-4 justify-content-center card body">
      <div className="col-md-6 card shadow p-4">
    <h2 className='text-dark'>Add Product</h2>
    <form action="" onSubmit={submit}>
      {loading}
      {success}
      {error}
      <label htmlFor="" ><b className='text-dark'>Product Name</b></label><br />
      <input type="text" className='form-control' value={product_name} onChange={(e) => setProduct_name(e.target.value)}required/><br />
      <label htmlFor="" ><b className='text-success'>Description</b></label><br />
      <textarea name="" id="" rows="2" cols="50" className='form-control' onChange={(e) => setProduct_description(e.target.value)}></textarea>
      <label htmlFor="" ><b className='text-warning'>cost(ksh)</b></label><br />
      <input type="number" className='form-control' value={product_cost} onChange={(e) => setProduct_cost(e.target.value)}/><br />
      <label htmlFor="" ><b className='text-danger'>Product Photo</b></label><br />
      <input type="file" className='form-control'accept='image/*' onChange={(e) => setProduct_photo (e.target.files[0])}/><br />
       <button className='btn btn-dark' type='submit'>
        Add Product
      </button>
    </form>
      </div>
     
    </div>
  )
}

export default Addproduct
