import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import {
  getAllUsers,
  deleteUser,
  resetErrorAndRemoval,
} from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const UsersTab: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [userToDelete, setUserToDelete] = useState<string>('');
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const admin = useSelector((state: RootState) => state.admin);
  const user = useSelector((state: RootState) => state.user);
  const { error, loading, userRemoval, userList } = admin;
  const { userInfo } = user;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(resetErrorAndRemoval());
  }, [dispatch]);

  useEffect(() => {
    if (userRemoval) {
      toast({
        description: 'User has been removed.',
        status: 'success',
        isClosable: true,
      });
    }
  }, [userRemoval, toast]);

  const openDeleteConfirmBox = (user: string) => {
    setUserToDelete(user);
    onOpen();
  };

  return (
    <Box>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify='center'>
          <Stack direction='row' spacing='4'>
            <Spinner
              mt='20'
              thickness='2px'
              speed='0.65s'
              emptyColor='gray.200'
              color='orange.500'
              size='xl'
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Registered</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList &&
                  userList.map((user) => (
                    <Tr key={user._id}>
                      <Td>
                        {user.name} {user._id === userInfo?._id ? '(You)' : ''}
                      </Td>
                      <Td>{user.email}</Td>
                      <Td>{new Date(user.createdAt).toDateString()}</Td>
                      <Td>
                        {user.isAdmin === true ? (
                          <CheckCircleIcon color='orange.500' />
                        ) : (
                          ''
                        )}
                      </Td>
                      <Td>
                        <Button
                          disabled={user._id === userInfo?._id}
                          variant='outline'
                          onClick={() => openDeleteConfirmBox(user._id)}
                        >
                          <DeleteIcon mr='5px' />
                          Remove User
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemovalAlert
            isOpen={isOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={{ _id: userToDelete, name: '' }}
            deleteAction={(id: string) => dispatch(deleteUser(id))}
          />
        </Box>
      )}
    </Box>
  );
};

export default UsersTab;
