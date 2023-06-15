import React from 'react';
import {
  Icon,
  Flex,
  Stack,
  Tooltip,
  Circle,
  Box,
  Image,
  Badge,
  Link,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import { Link as ReactLink } from 'react-router-dom';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { addCartItem } from '../redux/actions/cartActions';
import { RootState } from '../redux/store';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const toast = useToast();
  const cartInfo = useSelector((state: RootState) => state.cart);
  const { cart } = cartInfo;

  const addItem = (id: any) => {
    if (cart.some((cartItem) => cartItem.id === id)) {
      toast({
        description:
          'The product is already in your cart. You can change the amount from your cart.',
        status: 'error',
        isClosable: true,
      });
    } else {
      dispatch(addCartItem(id, 1));
      toast({
        description: 'Product has been added.',
        status: 'success',
        isClosable: true,
      });
    }
  };

  return (
    <Stack
      p={'2'}
      h={'450px'}
      minW={'240px'}
      bg={useColorModeValue('white', 'gray.600')}
      spacing={'3px'}
      borderWidth={'1px'}
      rounded={'lg'}
      shadow={'lg'}
      position={'relative'}
    >
      {product.isNewProd && (
        <Circle
          bg={'green'}
          size={'10px'}
          position={'absolute'}
          top={'3'}
          right={'2'}
        />
      )}
      {product.stock === 0 && (
        <Circle
          bg={'red'}
          size={'10px'}
          position={'absolute'}
          top={'3'}
          right={'2'}
        />
      )}
      <Image
        src={product.image}
        alt={product.name}
        maxH={'70%'}
        roundedTop={'lg'}
      />
      <Box flex={'1'} maxH={'5'} alignItems={'baseline'}>
        {product.stock === 0 && (
          <Badge colorScheme='red' rounded={'full'} px={'2'}>
            Sold Out
          </Badge>
        )}
        {product.isNewProd && (
          <Badge colorScheme='green' rounded={'full'} px={'2'}>
            New
          </Badge>
        )}
      </Box>
      <Flex mt={'1'} justifyContent={'space-between'} alignContent={'center'}>
        <Link
          as={ReactLink}
          to={`/product/${product._id}`}
          pt={'2'}
          cursor={'pointer'}
        >
          <Box fontSize={'xl'} fontWeight={'semibold'} lineHeight={'8'}>
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex justify={'space-between'} alignContent={'center'} py={'2'}>
        <Rating rating={product.rating} reviews={product.reviewed} />
      </Flex>
      <Flex justify={'space-between'}>
        <Box fontSize={'xl'} color={useColorModeValue('black', 'white')}>
          <Box as='span' mr={'3px'}>
            $
          </Box>
          {Number(product.price).toFixed(2)}
        </Box>
        <Tooltip
          label={
            product.stock === 0 ? 'Sorry, this item is sold.' : 'Add to cart'
          }
          bg={'white'}
          placement='top'
          color={'gray.800'}
          fontSize={'1.2em'}
        >
          <Button
            variant={'ghost'}
            display={'flex'}
            isDisabled={product.stock === 0}
            onClick={() => addItem(product._id)}
          >
            <Icon as={MdShoppingCart} alignSelf={'center'} h={'8'} w={'8'} />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
