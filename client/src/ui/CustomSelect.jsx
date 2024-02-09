import { FormControl, FormErrorMessage, FormLabel, HStack, Select } from '@chakra-ui/react'
import { useField } from 'formik'
const CustomSelect = ({ label, ...props }) => {

  const [field, meta] = useField(props)

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <HStack alignItems='flex-end'>
        {label && <FormLabel htmlFor={props.name}>{label}</FormLabel>}
        <Select {...field} {...props}

        ></Select>
      </HStack>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomSelect