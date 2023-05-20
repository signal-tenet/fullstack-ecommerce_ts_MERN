import {
  useColorModeValue as mode,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Link,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { RootState } from 'redux/store';

import CartOrderSummary from '../components/CartOrderSummary';

const CartPage = () => {
  const cartInfo = useSelector((state: RootState) => state.cart);
  const { loading, error, cart } = cartInfo;
  const getHeadingContent = () =>
    cart.length === 1 ? '(1 Item)' : `(${cart.length} Items)`;

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
      ) : cart.length === 0 ? (
        <Alert status='warning'>
          <AlertIcon />
          <AlertTitle>Add something to your cart.</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to='/products'>
              Click here - it's shopping time!
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: '3xl', lg: '7xl' }}
          mx={'auto'}
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}
          >
            <Stack spacing={{ base: '8', md: '10' }} flex={'2'}>
              <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                Shopping Cart {getHeadingContent()}
              </Heading>
              <Stack spacing={'6'}>
                {cart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction={'column'} align='center' flex={'1'}>
              <CartOrderSummary />
              <HStack mt={'6'} fontWeight={'semibold'}>
                <p>or</p>
                <Link
                  as={ReactLink}
                  to={'/products'}
                  color={mode('green.400', 'green.200')}
                >
                  Continue shopping.
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartPage;
