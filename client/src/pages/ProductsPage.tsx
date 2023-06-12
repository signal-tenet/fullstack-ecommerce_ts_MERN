import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Wrap,
  Spinner,
  WrapItem,
} from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';

export const ProductsPage = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const productList = useSelector((state: RootState) => state.products);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Wrap spacing={'30px'} justify='center' minHeight={'100vh'}>
      {loading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We have got an error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        products.map((product: any) => (
          <WrapItem key={product._id}>
            <Center w={'220px'} h={'500px'}>
              <ProductCard product={product} />
            </Center>
          </WrapItem>
        ))
      )}
    </Wrap>
  );
};
