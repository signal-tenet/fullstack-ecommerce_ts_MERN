import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Field, useField } from 'formik';

interface TextFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  type,
  name,
  placeholder,
}) => {
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)} mb='6'>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Field
        as={Input}
        {...field}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
