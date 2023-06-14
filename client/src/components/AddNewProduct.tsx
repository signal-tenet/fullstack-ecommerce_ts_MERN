import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { uploadProduct } from '../redux/actions/adminActions';
import { RootState } from '../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

interface NewProduct {
  brand: string;
  name: string;
  category: string;
  stock: string;
  price: string;
  image: string;
  isNewProd: boolean;
  description: string;
}

const AddNewProduct: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [isNewProd, setIsNewProd] = useState(true);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const createNewProduct = () => {
    const newProduct: NewProduct = {
      brand,
      name,
      category,
      stock,
      price,
      image,
      isNewProd,
      description,
    };
    dispatch(uploadProduct(newProduct));
  };

  return (
    <Tr>
      <Td>
        <Text fontSize='sm'>Image File Name</Text>
        <Tooltip
          label={'Set the name of your image e.g., iPhone.jpg'}
          fontSize='sm'
        >
          <Input
            size='sm'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder='e.g., iPhone.jpg'
          />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize='sm'>Description</Text>
        <Textarea
          value={description}
          w='270px'
          h='120px'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder='Description'
          size='sm'
        />
      </Td>
      <Td>
        <Text fontSize='sm'>Brand</Text>
        <Input
          size='sm'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder='Apple or Samsung etc.'
        />
        <Text fontSize='sm'>Name</Text>
        <Input
          size='sm'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Samsung S30'
        />
      </Td>

      <Td>
        <Text fontSize='sm'>Category</Text>
        <Input
          size='sm'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Electronics'
        />
        <Text fontSize='sm'>Price</Text>
        <Input
          size='sm'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='299.99'
        />
      </Td>

      <Td>
        <Text fontSize='sm'>Stock</Text>
        <Input
          size='sm'
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <Text fontSize='sm'>New badge shown on product card</Text>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='sm'>
            Enable
            <Badge
              rounded='full'
              px='1'
              mx='1'
              fontSize='0.8em'
              colorScheme='green'
            >
              New
            </Badge>
            badge?
          </FormLabel>
          <Switch
            id='productIsNewFlag'
            onChange={() => setIsNewProd(!isNewProd)}
            isChecked={isNewProd}
          />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button
            variant='outline'
            w='160px'
            colorScheme='orange'
            onClick={() => createNewProduct()}
          >
            <MdDriveFolderUpload />
            <Text ml='2'>Save Product</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
