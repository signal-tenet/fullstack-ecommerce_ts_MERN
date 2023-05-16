import React from 'react';
import {
    Box,
    Flex,
    useDisclosure,
    HStack,
    Link,
    IconButton,
    Icon,
    Text,
    Button,
    Stack,
    useColorModeValue,
    useColorMode,
    Center,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { HamburgerIcon, SunIcon, MoonIcon, CloseIcon } from '@chakra-ui/icons';
import { GiGalaxy } from 'react-icons/gi';

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
        rounded="md"
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

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                    aria-label="menu"
                />
                <HStack>
                    <Link as={ReactLink} to="/">
                        <Flex alignItems="center">
                            <Icon as={GiGalaxy} h={6} w={6} color="teal.500" />
                            <Text fontWeight="extrabold">Galaxy of Gadgets</Text>
                        </Flex>
                    </Link>
                    <HStack>
                        {links.map((link) => (
                            <NavLink key={link.linkName} path={link.path}>
                                {link.linkName}
                            </NavLink>
                        ))}
                    </HStack>
                </HStack>
                <Flex>
                    <NavLink path="/">
                        <Button alignSelf="center" onClick={() => toggleColorMode()}>
                            <Icon as={colorMode === 'light' ? MoonIcon : SunIcon} />
                        </Button>
                    </NavLink>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;