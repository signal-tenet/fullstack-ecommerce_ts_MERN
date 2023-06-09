import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import { createOrder, resetOrder } from '../redux/actions/orderActions';
import { useEffect, useState, useCallback } from 'react';
import CheckoutItem from './CheckoutItem';
import PayPalButton from './PayPalButton';
import { resetCart } from '../redux/actions/cartActions';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/Cart';

const CheckoutOrderSummary = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const colorMode = mode('gray.600', 'gray.400');
  const cartItems = useSelector((state: RootState) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;
  const user = useSelector((state: RootState) => state.user);
  const { userInfo } = user;
  const shippingInfo = useSelector((state: RootState) => state.order);
  const { error, shippingAddress } = shippingInfo;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

  const shipping = useCallback(
    () => (expressShipping === true ? 14.99 : subtotal <= 1000 ? 4.99 : 0),
    [expressShipping, subtotal]
  );

  const total = useCallback(
    () =>
      Number(
        shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()
      ).toFixed(2),
    [shipping, subtotal]
  );

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

  const onPaymentSuccess = async (data: any) => {
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );
    dispatch(resetOrder());
    dispatch(resetCart());
    navigate('/order-success');
  };

  const onPaymentError = () => {
    toast({
      description: 'Something went wrong. Please try again.',
      status: 'error',
      duration: 300000,
      isClosable: true,
    });
  };

  return (
    <Stack spacing='8' rounded='xl' padding='8' width='full'>
      <Heading size='md'>Order Summary</Heading>
      {cart.map((item: CartItem) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {subtotal}
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                Free
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='semibold'>
            Total
          </Text>
          <Text fontSize='xl' fontWeight='extrabold'>
            ${Number(total())}
          </Text>
        </Flex>
        <PayPalButton
          total={total}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
          disabled={buttonDisabled}
        />
      </Stack>
      <Box alignSelf={'center'}>
        <Text fontSize='sm'>
          Have questions? or need help to complete your order?
        </Text>
        <Flex justifyContent='center' color={mode('orange.500', 'orange.100')}>
          <Flex align='center'>
            <ChatIcon />
            <Text m='2'>Live Chat</Text>
          </Flex>
          <Flex align='center'>
            <PhoneIcon />
            <Text m='2'>Phone</Text>
          </Flex>
          <Flex align='center'>
            <EmailIcon />
            <Text m='2'>Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode('gray.400', 'gray.800')} />
      <Flex justifyContent='center' my='6' fontWeight='semibold'>
        <p>or</p>
        <Link as={ReactLink} to='/products' ml='1'>
          Continue Shopping
        </Link>
      </Flex>
    </Stack>
  );
};

export default CheckoutOrderSummary;
