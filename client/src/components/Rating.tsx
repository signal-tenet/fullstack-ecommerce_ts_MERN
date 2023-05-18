import { MdStar } from 'react-icons/md';
import { useState } from 'react';
import { Flex, HStack, Text } from '@chakra-ui/react';

interface RatingProps {
  rating: number;
  reviews: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviews }) => {
  const [iconSize, setIconSize] = useState('14px');
  return (
    <Flex>
      <HStack spacing={'2px'}>
        <MdStar size={iconSize} width={'14px'} color='orange' />
        <MdStar
          size={iconSize}
          width={'14px'}
          color={rating >= 2 ? 'orange' : 'gray'}
        />
        <MdStar
          size={iconSize}
          width={'14px'}
          color={rating >= 3 ? 'orange' : 'gray'}
        />
        <MdStar
          size={iconSize}
          width={'14px'}
          color={rating >= 4 ? 'orange' : 'gray'}
        />
        <MdStar
          size={iconSize}
          width={'14px'}
          color={rating >= 5 ? 'orange' : 'gray'}
        />
      </HStack>
      <Text fontSize={'md'} fontWeight={'bold'} ml={'4px'}>
        {`${reviews} ${reviews === 1 ? 'Review' : 'Reviews'}`}
      </Text>
    </Flex>
  );
};

export default Rating;
