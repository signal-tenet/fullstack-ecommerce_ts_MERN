import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import { GiGalaxy } from 'react-icons/gi';

const LandingPage = () => (
  <Box
    maxW='8xl'
    mx='auto'
    px={{ base: '0', lg: '12' }}
    py={{ base: '0', lg: '12' }}
    minH='6xl'
  >
    <Stack
      direction={{ base: 'column-reverse', lg: 'row' }}
      spacing={{ base: '0', lg: '20' }}
    >
      <Box
        width={{ lg: 'sm' }}
        transform={{ base: 'translateY(-50%)', lg: 'none' }}
        bg={{
          base: useColorModeValue('orange.50', 'gray.700'),
          lg: 'transparent',
        }}
        mx={{ base: '6', md: '8', lg: '0' }}
        px={{ base: '6', md: '8', lg: '0' }}
        py={{ base: '6', md: '8', lg: '12' }}
      >
        <Stack spacing={{ base: '8', lg: '10' }}>
          <Stack spacing={{ base: '2', lg: '4' }}>
            <Flex alignItems='center'>
              <Icon
                as={GiGalaxy}
                h={12}
                w={12}
                color={useColorModeValue('teal.500', 'teal.400')}
              />
              <Text fontSize='4xl' fontWeight='bold'>
                Galaxy of Gadgets
              </Text>
            </Flex>
            <Heading size='md' paddingLeft={'20px'} fontWeight='normal'>
              Makes your life smarter.
            </Heading>
          </Stack>
          <HStack spacing='3'>
            <Link
              as={ReactLink}
              to='/products'
              color={useColorModeValue('orange.500', 'orange.300')}
              fontWeight='bold'
              fontSize='lg'
              paddingLeft={'20px'}
            >
              Discover now
            </Link>
            <Icon
              color={useColorModeValue('orange.500', 'ornage.300')}
              as={FaArrowRight}
            />
          </HStack>
          <Stack direction='column' spacing='3'>
            <Text fontSize='md' align={'center'} fontWeight='bold' as='mark'>
              Warning! Wait up to 3 minutes till the products will load.
            </Text>
            <Text as='span' fontSize='xs'>
              The initial load of the products takes up to 3 minutes. Don't try
              to log in or register before products are loaded. This is caused
              by the limitations of the free version of Render.com.
            </Text>
          </Stack>
        </Stack>
      </Box>
      <Flex flex='1' overflow='hidden'>
        <Image
          src='../images/main_hero.webp'
          alt='Image - new gadgets'
          fallback={<Skeleton />}
          maxH='550px'
          minW='300px'
          objectFit='cover'
          flex='1'
        />
      </Flex>
    </Stack>
  </Box>
);

export default LandingPage;
