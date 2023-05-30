import React from 'react';
import {
  Box,
  Flex,
  MenuButton,
  MenuDivider,
  Menu,
  MenuList,
  MenuItem,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import {
  HamburgerIcon,
  SunIcon,
  MoonIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { GiGalaxy } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { MdLocalShipping, MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { RootState } from 'redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

const links = [
  { linkName: 'Products', path: '/products' },
  { linkName: 'Shopping Cart', path: '/cart' },
];

interface NavLinkProps {
  path: string;
  children: React.ReactNode;
}

const NavLink = ({ path, children }: NavLinkProps) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded='md'
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
);

const Navbar = (): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((state: RootState) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const toast = useToast();
  const color_black_white = useColorModeValue('black', 'white');
  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: 'You have been logged out.',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          aria-label='menu'
        />
        <HStack>
          <Link as={ReactLink} to={'/'}>
            <Flex alignItems={'center'}>
              <Icon mr={2} as={GiGalaxy} h={6} w={6} color={'teal.500'} />
              <Text fontWeight={'extrabold'}>Galaxy of Gadgets</Text>
            </Flex>
          </Link>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <NavLink path='#'>
            <Button alignSelf={'center'} onClick={() => toggleColorMode()}>
              <Icon as={colorMode === 'light' ? MoonIcon : SunIcon} />
            </Button>
          </NavLink>

          {userInfo ? (
            <Menu>
              <MenuButton px='4' py='2' transition='all 0.3s' as={Button}>
                {userInfo.name} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem as={ReactLink} to='/profile'>
                  <CgProfile />
                  <Text ml='2'>Profile</Text>
                </MenuItem>
                <MenuItem as={ReactLink} to='/your-orders'>
                  <MdLocalShipping />
                  <Text ml='2'>Your Orders</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>
                  <MdLogout />
                  <Text ml='2'>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={ReactLink}
                to='/login'
                fontSize={'sm'}
                fontWeight={500}
                variant={'link'}
                color={color_black_white}
                display={{ base: 'none', md: 'inline-flex' }}
                bg={'blue.500'}
                m={2}
                p={2}
              >
                Sign In
              </Button>
              <Button
                as={ReactLink}
                to='/registration'
                fontSize={'sm'}
                fontWeight={500}
                variant={'link'}
                color={color_black_white}
                display={{ base: 'none', md: 'inline-flex' }}
                m={2}
                p={2}
                _hover={{ bg: 'blue.400' }}
                bg={'blue.500'}
              >
                Sign Up
              </Button>{' '}
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {links.map((link) => (
              <NavLink path={link.path}>{link.linkName}</NavLink>
            ))}
            <NavLink key={'sign in'} path={'/login'}>
              Sign In
            </NavLink>
            <NavLink key={'sign up'} path={'/registration'}>
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
