import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Wrap,
  Spinner,
  WrapItem,
  Box,
  Stack,
  Text,
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
        <Box width={{ lg: 'sm' }}>
          <Stack spacing={{ base: '8', lg: '10' }}>
            <Stack direction='column' spacing='3'>
              <Spinner
                alignSelf={'center'}
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
              <Text fontSize='md' align={'center'} fontWeight='bold' as='mark'>
                Warning! Wait up to 3 minutes till the products will load.
              </Text>
              <Text as='span' fontSize='xs'>
                The initial load of the products takes up to 3 minutes. Don't
                try to log in or register before products are loaded. This is
                caused by the limitations of the free version of Render.com.
              </Text>
            </Stack>
          </Stack>
        </Box>
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
