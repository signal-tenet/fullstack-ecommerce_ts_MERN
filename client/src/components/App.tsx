import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { ProductsPage } from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import Footer from './Footer';
import LandingPage from '../pages/LandingPage';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/products' element={<ProductsPage />}></Route>
            <Route path='/product/:id' element={<ProductPage />}></Route>
            <Route path='/cart' element={<CartPage />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};
export default App;
