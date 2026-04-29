import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'

const Getproduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const { addToCart } = useCart()
  const navigate = useNavigate()

  const img_url =
    'http://gitongatruham.alwaysdata.net/static/images/'

  // FETCH PRODUCTS
  const getproducts = async () => {
    setLoading('Loading products...')

    try {
      const response = await axios.get(
        'http://gitongatruham.alwaysdata.net/api/get_product_details'
      )

      setProducts(response.data)
      setLoading('')
    } catch (error) {
      setError(error.message)
      setLoading('')
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.product_name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  // GET DETAILED DESCRIPTION BASED ON BIKE TYPE
  const getDescription = (name) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('mountain')) {
      return "The mountain bike is engineered for rugged off-road adventures, featuring a durable aluminum or carbon fiber frame that withstands impacts and vibrations. Equipped with wide, knobby tires for superior traction on dirt trails, rocks, and mud, along with front and rear suspension systems to absorb bumps and provide a smoother ride. It typically includes 21-27 gears for tackling steep inclines and descents, disc brakes for reliable stopping power in wet conditions, and ergonomic handlebars for better control. Perfect for trail riding, mountain biking enthusiasts, and those seeking an adrenaline-pumping experience in natural terrains."
    } else if (lowerName.includes('road')) {
      return "Designed for speed and efficiency on paved surfaces, the road bike boasts a lightweight frame made from aluminum, carbon, or titanium to minimize weight and maximize performance. It features narrow, high-pressure tires that reduce rolling resistance, allowing for faster speeds with less effort. With multiple gears (often 16-22), drop handlebars for aerodynamic positioning, and rim or disc brakes, it's ideal for long-distance cycling, commuting, and competitive racing. The aerodynamic design, including a sleek frame and integrated components, helps cyclists achieve higher speeds while maintaining comfort during extended rides."
    } else if (lowerName.includes('hybrid')) {
      return "Combining the best of mountain and road bikes, the hybrid bike offers versatility for various terrains and riding styles. It features a comfortable, upright riding position with flat handlebars, wider tires than road bikes but narrower than mountain bikes, and a mix of gears suitable for both paved roads and light trails. Often equipped with fenders, racks, and lights for practicality, hybrids are great for commuting, leisure riding, and light off-road exploration. The balanced geometry provides stability and comfort, making it an excellent choice for everyday cyclists who want a bike that can handle multiple scenarios without sacrificing performance."
    } else if (lowerName.includes('electric') || lowerName.includes('e-bike')) {
      return "The electric bike, or e-bike, revolutionizes cycling by integrating a battery-powered motor that assists with pedaling, making it easier to tackle hills, long distances, and varied terrains. Featuring a rechargeable lithium-ion battery, electric motor (typically hub or mid-drive), and pedal-assist sensors, it allows riders to choose from multiple power levels. With gears for manual control, comfortable seating, and often integrated lights and displays, e-bikes are perfect for commuting, recreational riding, and those with mobility considerations. They maintain the health benefits of cycling while reducing physical strain, making biking accessible to a wider audience."
    } else if (lowerName.includes('folding')) {
      return "Compact and portable, the folding bike is designed for urban dwellers and travelers who need a bike that can be easily stored or transported. It features a hinged frame that collapses into a small package, quick-release wheels, and lightweight materials like aluminum. With gears for varied terrain, comfortable seating, and often integrated locks, folding bikes are ideal for commuting via public transport, apartment living, or occasional use. Despite their compact size, they offer a smooth ride and can handle daily cycling needs efficiently."
    } else if (lowerName.includes('bmx')) {
      return "Built for freestyle tricks, racing, and urban riding, the BMX bike is a compact, sturdy machine with a single-speed drivetrain and no gears. Featuring a small frame (typically 20-inch wheels), pegs for tricks, and durable steel or chromoly construction, it's designed for high-impact maneuvers like jumps, grinds, and slides. With powerful brakes and reinforced components, BMX bikes are favored by young riders, stunt performers, and those seeking an exciting, skill-based cycling experience in skate parks and streets."
    } else if (lowerName.includes('cruiser')) {
      return "Emphasizing comfort and style, the cruiser bike offers a relaxed, upright riding position with wide tires, a long wheelbase, and often retro-inspired designs. Featuring a single-speed or fixed-gear drivetrain, coaster brakes, and plush seating, it's perfect for leisurely rides along beaches, boardwalks, or city streets. With its vintage aesthetic and comfortable geometry, cruisers are ideal for casual cycling, sightseeing, and enjoying a stress-free biking experience without the need for speed or athletic performance."
    } else {
      return "This versatile bicycle is crafted for a wide range of cycling activities, combining durability, comfort, and performance. With a well-designed frame, appropriate gearing, and quality components, it caters to various rider preferences and terrains. Whether for commuting, recreation, or fitness, this bike offers reliability and enjoyment for everyday use."
    }
  }

  return (
    <div className="product-page">

      {/* TITLE */}
      <h2 className="page-title">
        Available Bicycle Products 🚴
      </h2>

      {/* SEARCH */}
      <div className="search-wrapper">
        <input
          type="text"
          className="search-box"
          placeholder="Search bicycles..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LOADING / ERROR */}
      {loading && (
        <div className="alert alert-info">{loading}</div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* PRODUCTS */}
      <div className="product-grid">

        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id || product._id || product.product_name}>

            {/* IMAGE */}
            <div className="product-image-card" onClick={() => setSelectedProduct(product)}>
              <img
                src={product.product_photo.startsWith('http') ? product.product_photo : img_url + product.product_photo}
                alt={product.product_name}
                className="product-image"
                onError={(e) =>
                  (e.target.src =
                    'https://via.placeholder.com/150')
                }
              />
              <div className="image-overlay">
                <span>Tap for details</span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="product-info">

              <h5 className="product-name">
                {product.product_name}
              </h5>

              <p className="product-desc">
                {getDescription(product.product_name).split('. ')[0]}.{' '}
                <button className="find-more-btn" onClick={() => setSelectedProduct(product)}>
                  Find Out More
                </button>
              </p>

              <p className="product-price">
                Ksh {product.product_cost}
              </p>

              <span className="badge bg-info mb-2">
                ORIGINAL
              </span>

              {/* BUTTONS */}
              <div className="button-row">

                <button
                  className="btn btn-warning"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-dark"
                  onClick={() =>
                    navigate('/makepayment', {
                      state: { product }
                    })
                  }
                >
                  Buy Now
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              ×
            </button>
            <div className="modal-image-wrapper">
              <img
                src={selectedProduct.product_photo.startsWith('http') ? selectedProduct.product_photo : img_url + selectedProduct.product_photo}
                alt={selectedProduct.product_name}
              />
            </div>
            <div className="modal-details">
              <h2>{selectedProduct.product_name}</h2>
              <p>{getDescription(selectedProduct.product_name)}</p>
              <p><strong>Price:</strong> Ksh {selectedProduct.product_cost}</p>
              <div className="modal-actions">
                <button className="btn btn-warning" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                  Add to Cart
                </button>
                <button className="btn btn-dark" onClick={() => navigate('/makepayment', { state: { product: selectedProduct } })}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Getproduct