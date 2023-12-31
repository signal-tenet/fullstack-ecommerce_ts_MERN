import {
  Box,
  Th,
  Tr,
  Table,
  Thead,
  Tbody,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import {
  getProducts,
  resetProductError,
} from '../redux/actions/productActions';
import { Product } from '../types/Product';
import ProductTableItem from './ProductTableItem';
import AddNewProduct from './AddNewProduct';

const ProductsTab = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const admin = useSelector((state: RootState) => state.admin);
  const { error, loading } = admin;
  const productInfo = useSelector((state: RootState) => state.products);
  const { products, productUpdate } = productInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (productUpdate) {
      toast({
        description: 'Product has been updated.',
        status: 'success',
        isClosable: true,
      });
    }
  }, [dispatch, toast, productUpdate]);

  return (
    <Box>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify='center'>
          <Stack direction='row' spacing='4'>
            <Spinner
              mt='20'
              thickness='2px'
              speed='0.65s'
              emptyColor='gray.200'
              color='orange.500'
              size='xl'
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='right'>
                    <Box>
                      <Text mr='8px' fontWeight='bold'>
                        Add a new Product
                      </Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb='4'>
                <Table>
                  <Tbody>
                    <AddNewProduct />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant='simple' size='lg'>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Description</Th>
                <Th>Brand & Name</Th>
                <Th>Category & Price</Th>
                <Th>Stock & new Badge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 &&
                products.map((product: Product) => (
                  <ProductTableItem key={product._id} product={product} />
                ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ProductsTab;
