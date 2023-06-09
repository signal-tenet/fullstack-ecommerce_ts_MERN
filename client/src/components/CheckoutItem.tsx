import {
  Flex,
  Select,
  useColorModeValue as mode,
  Image,
  Box,
  Text,
  Spacer,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/actions/cartActions';
import { CartItem } from '../types/Cart';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

interface CheckoutItemProps {
  cartItem: CartItem;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const quantityOptions: number[] = [];
  for (let i = 1; i <= stock; i++) {
    quantityOptions.push(i);
  }

  return (
    <>
      <Flex>
        <Image
          rounded='lg'
          width='120px'
          height='120px'
          fit='cover'
          src={image}
          alt={name}
          draggable={false}
          loading='lazy'
        />
        <Stack direction='column' align='stretch' flex='1' mx='2' spacing='4'>
          <Text noOfLines={2} maxW='150px'>
            {name}
          </Text>
          <Spacer />
          <Select
            maxW='64px'
            focusBorderColor={mode('orange.500', 'orange.200')}
            value={qty}
            onChange={(e) => {
              dispatch(addCartItem(id, parseInt(e.target.value, 10)));
            }}
          >
            {quantityOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </Stack>
        <Box>
          <Text fontWeight='bold'>${price}</Text>
        </Box>
      </Flex>
      <Divider bg={mode('gray.400', 'gray.800')} />
    </>
  );
};

export default CheckoutItem;
