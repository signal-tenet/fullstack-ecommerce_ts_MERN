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
} from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import { Link as ReactLink } from 'react-router-dom';
import Rating from './Rating';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    image: string;
    stock: number;
    isNewProd: boolean;
    rating: number;
    reviewed: number;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
          {product.price.toFixed(2)}
        </Box>
        <Tooltip
          label='Add to cart'
          bg={'white'}
          placement='top'
          color={'gray.800'}
          fontSize={'1.2em'}
        >
          <Button
            variant={'ghost'}
            display={'flex'}
            disabled={product.stock === 0}
          >
            <Icon as={MdShoppingCart} alignSelf={'center'} h={'8'} w={'8'} />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
