 import React, { useState } from 'react'
import axios from 'axios'

const Addproduct = () => {

  // Product states
  const [product_name, setProduct_name] = useState('')
  const [product_description, setProduct_description] = useState('')
  const [product_cost, setProduct_cost] = useState('')
  const [product_photo, setProduct_photo] = useState(null)
  const [preview, setPreview] = useState('')

  // UI states
  const [loading, setLoading] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Submit function
  const submit = async (e) => {
    e.preventDefault()

    // Validation
    if (!product_name || !product_cost || !product_photo) {
      setError("Please fill all required fields")
      return
    }

    setLoading('Please wait as we process your request...')
    setError('')
    setSuccess('')

    try {
      const data = new FormData()
      data.append('product_name', product_name)
      data.append('product_description', product_description)
      data.append('product_cost', product_cost)
      data.append('product_photo', product_photo)

      const response = await axios.post(
        'http://gitongatruham.alwaysdata.net/api/add_product',
        data
      )

      // Success
      setLoading('')
      setSuccess(response.data.message)

      // Clear form
      setProduct_name('')
      setProduct_cost('')
      setProduct_description('')
      setProduct_photo(null)
      setPreview('')

    } catch (err) {
      setLoading('')
      setError(err.message)
    }
  }

  return (
    <div className="row mt-4 justify-content-center">
      <div className="col-md-6 card shadow p-4">

        <h2 className='text-danger text-center mb-3'>Add Product</h2>

        <form onSubmit={submit}>

          {/* Alerts */}
          {loading && <div className="alert alert-info">{loading}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Product Name */}
          <label><b>Product Name</b></label>
          <input
            type="text"
            className='form-control'
            value={product_name}
            onChange={(e) => {
              setProduct_name(e.target.value)
              setError('')
              setSuccess('')
            }}
            required
          />
          <br />

          {/* Description */}
          <label><b>Description</b></label>
          <textarea
            rows="2"
            className='form-control'
            value={product_description}
            onChange={(e) => setProduct_description(e.target.value)}
          />
          <br />

          {/* Cost */}
          <label><b>Cost (Ksh)</b></label>
          <input
            type="number"
            className='form-control'
            value={product_cost}
            onChange={(e) => setProduct_cost(e.target.value)}
          />
          <br />

          {/* Image Upload */}
          <label><b>Product Photo</b></label>
          <input
            type="file"
            className='form-control'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files[0]
              setProduct_photo(file)
              setPreview(URL.createObjectURL(file))
            }}
          />
          <br />

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="img-fluid mb-3"
              style={{ borderRadius: "10px" }}
            />
          )}

          {/* Submit Button */}
          <button className='btn btn-dark w-100' type='submit' disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Addproduct
