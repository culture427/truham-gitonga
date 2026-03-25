
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Signin from './components/Signin';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <p className='text-dark'>his imperial majesty present...</p>
        <h1 className='text-dark'> LA BICYCLETA ONLINE PURCHASING</h1> 
      </header>
      <nav>
        <Link to='/' className='btn btn-dark m-2 text-decoration-underline '>Home</Link>
        <Link to='/signup' className='btn btn-dark m-2 text-decoration-underline text-success'>Signup</Link>
        <Link to='/signin' className='btn btn-dark m-2 text-decoration-underline text-warning'>Signin</Link>
        <Link to='/addproduct' className='btn btn-dark m-2 text-decoration-underline text-danger'>Add Product</Link>
        
      </nav>
      <Routes>
        <Route path='/signup' element = {<Signup />} /> 
        <Route path='/signin' element = {<Signin />} />
        <Route path='/addproduct' element = { <Addproduct />} />
        <Route path='/' element = {<Getproduct />} />
        <Route path='/makepayment' element = {<Makepayment />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
