import {
  CloseButton,
  Flex,
  Select,
  useColorModeValue as mode,
  Stack,
  Image,
  Box,
  Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { addCartItem, removeCartItem } from '../redux/actions/cartActions';
import { CartItem as CartItemType } from '../types/Cart';
import { RootState } from '../redux/store';

interface CartItemProps {
  cartItem: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

  const options = [];
  for (let i = 1; i <= stock; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify='space-between'
      align='center'
    >
      <Stack direction='row' spacing='5' width='full'>
        <Image
          rounded='lg'
          w='120px'
          h='120px'
          fit='cover'
          src={image}
          alt={name}
          draggable='false'
          loading='lazy'
        />
        <Box pt='4'>
          <Stack spacing='0.5'>
            <Text fontWeight='medium'>{name}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        w='full'
        mt={{ base: '4', md: '0' }}
        align={{ base: 'center', md: 'baseline' }}
        justify='space-between'
        display='flex'
      >
        <Select
          maxW='64px'
          focusBorderColor={mode('green.500', 'green.200')}
          value={qty}
          onChange={(e) => {
            dispatch(addCartItem(id, parseInt(e.target.value, 10)));
          }}
        >
          {options}
        </Select>
        <Text fontWeight='bold'>${price}</Text>
        <CloseButton onClick={() => dispatch(removeCartItem(id))} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
