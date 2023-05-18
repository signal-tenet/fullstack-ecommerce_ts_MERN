import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { ProductsPage } from '../pages/ProductsPage';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/products' element={<ProductsPage />}></Route>
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
};
export default App;
