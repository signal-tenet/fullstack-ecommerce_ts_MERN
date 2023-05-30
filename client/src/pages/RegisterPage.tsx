import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { register } from '../redux/actions/userActions';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const user = useSelector((state: RootState) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = '/products';
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: 'Account created. Welcome!',
        status: 'success',
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required.'),
        email: Yup.string()
          .email('Invalid email.')
          .required('Email is required.'),
        password: Yup.string()
          .min(6, 'Password must contain at least 6 characters.')
          .required('Password is required.'),
        confirmPassword: Yup.string()
          .min(6, 'Password must contain at least 6 characters.')
          .required('Password is required.')
          .oneOf([Yup.ref('password')], 'Passwords must match.'),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container
          maxW='lg'
          py={{ base: '12', md: '24' }}
          px={{ base: '0', md: '8' }}
          minH='4xl'
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing='8'>
              <Stack spacing='6'>
                <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                  <Heading size={headingBR}>Create an account.</Heading>
                  <HStack spacing='1' justify='center'>
                    <Text color='muted'>Already a user? </Text>
                    <Button
                      as={ReactLink}
                      to='/login'
                      variant='link'
                      colorScheme='orange'
                    >
                      Sign in
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{ base: '0', md: '8' }}
                px={{ base: '4', md: '10' }}
                bg={boxBR}
                boxShadow={{ base: 'none', md: 'xl' }}
              >
                <Stack spacing='6'>
                  {error && (
                    <Alert
                      status='error'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                      textAlign='center'
                    >
                      <AlertIcon />
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <FormControl>
                    <TextField
                      type='text'
                      name='name'
                      placeholder='First and last name'
                      label='Full name'
                    />
                    <TextField
                      type='text'
                      name='email'
                      placeholder='you@example.com'
                      label='Email'
                    />
                    <PasswordTextField
                      type='password'
                      name='password'
                      placeholder='Password'
                      label='Password'
                    />
                    <PasswordTextField
                      type='password'
                      name='confirmPassword'
                      placeholder='Confirm your password'
                      label='Confirm your password'
                    />
                  </FormControl>
                  <Button
                    colorScheme='orange'
                    size='lg'
                    fontSize='md'
                    isLoading={loading}
                    type='submit'
                  >
                    Sign up
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </form>
        </Container>
      )}
    </Formik>
  );
};

export default RegisterPage;
