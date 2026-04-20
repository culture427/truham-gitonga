 import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Getproduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  // search state
  const [search, setSearch] = useState('')

  const img_url = 'http://gitongatruham.alwaysdata.net/static/images/'
  const navigate = useNavigate ()

  const getproducts = async () => {
    setLoading('please wait as we retrieve the products...')
    try {
      const response = await axios.get('http://gitongatruham.alwaysdata.net/api/get_product_details')
      setLoading('')
      setProducts(response.data)
      console.log(response)

    } catch (error) {
      setLoading('')
      setError(error.message)
      console.log(error)
    }
  }

  useEffect (()=> {
    getproducts()
  }, [])

  // filter products
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='row'>

      <h2><b><i><marquee behavior="" direction="">Available Products!!!</marquee></i></b></h2>

      {/* search bar */}
      <div className="col-md-12 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* IMPROVED UI */}
      {loading && <div className="alert alert-info">{loading}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* mapping the card for all the products */}
      {filteredProducts.map((product) => (
        <div className='col-md-3 justify-content-center mb-4' key={product.id}>
          <div className='card shadow'>

          {/* image fallback */}
          <img
            src={img_url + product.product_photo}
            alt=""
            className='product_img'
            onError={(e) => e.target.src = "https://via.placeholder.com/300"}
          />

          <div className="card_body"></div>

          <h5>{product.product_name}</h5>
          <p>{product.product_description}</p>
          <p><b>Ksh {product.product_cost}</b></p>

          {/* class → className (React rule) */}
          <span className='badge btn btn-info m-2'>
            <b><i>ORIGINAL</i></b>
          </span>

          {/* button UX */}
          <button
            className='btn btn-dark mt-2 w-100'
            onClick={() => navigate('/makepayment', {state: {product} })}
          >
            <b>Purchase Now</b>
          </button>

        </div>
        </div>
      ))}
    </div>
  )
}

export default Getproduct
