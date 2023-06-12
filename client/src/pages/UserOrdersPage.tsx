import {
  TableContainer,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Th,
  Tbody,
  Tr,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  Table,
  Td,
  AlertTitle,
  Wrap,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { getUserOrders } from '../redux/actions/userActions';

const UserOrdersPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const user = useSelector((state: RootState) => state.user);
  const { loading, error, orders, userInfo } = user;
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, [dispatch, userInfo]);

  return userInfo ? (
    <>
      {loading ? (
        <Wrap
          justify='center'
          direction='column'
          align='center'
          mt='20px'
          minH='100vh'
        >
          <Stack direction='row' spacing={4}>
            <Spinner
              mt={20}
              thickness='2px'
              speed='0.65s'
              emptyColor='gray.200'
              color='orange.500'
              size='xl'
            />
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : orders && orders.length > 0 ? (
        <TableContainer minHeight='100vh'>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Order Id</Th>
                <Th>Order Date</Th>
                <Th>Paid Total</Th>
                <Th>Items</Th>
                <Th>Print Receipt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order: any) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{new Date(order.createdAt).toDateString()}</Td>
                  <Td>
                    ${order.totalPrice} via {order.paymentMethod}
                  </Td>
                  <Td>
                    {order.orderItems.map((item: any) => (
                      <UnorderedList key={item._id}>
                        <ListItem>
                          {item.qty} x {item.name} (${item.price} each)
                        </ListItem>
                      </UnorderedList>
                    ))}
                  </Td>
                  <Td>
                    <Button variant='outline'>Receipt</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Alert status='info'>
          <AlertIcon />
          <AlertTitle>No orders found</AlertTitle>
        </Alert>
      )}
    </>
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
};

export default UserOrdersPage;
