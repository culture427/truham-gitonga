import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Footer from './components/Footer'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App container-fluid bg-light min-vh-100 d-flex flex-column">
        <header className="App-header bg-dark text-center py-3 shadow">
          <span className='badge btn btn-light mb-2'>
            <p className='text-dark m-0'>his imperial majesty present...</p>
          </span>
          <h1 className='text-white fw-bold'>
            LA BICYCLETA ONLINE PURCHASING
          </h1> 
        </header>
        <nav className="text-center my-3 p-2 bg-white shadow-sm rounded">
          <Link to='/' className='btn btn-dark m-2'>Home</Link>
          <Link to='/signup' className='btn btn-dark m-2 text-success'>Signup</Link>
          <Link to='/signin' className='btn btn-dark m-2 text-warning'>Signin</Link>
          <Link to='/addproduct' className='btn btn-dark m-2 text-danger'>Add Product</Link>
        </nav>

        <div className="container py-3 flex-grow-1">
          <Routes>
            <Route path='/signup' element={<Signup />} /> 
            <Route path='/signin' element={<Signin />} />
            <Route path='/addproduct' element={<Addproduct />} />
            <Route path='/' element={<Getproduct />} />
            <Route path='/makepayment' element={<Makepayment />} />
          </Routes>
        </div>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;