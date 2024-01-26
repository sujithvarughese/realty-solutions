import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useField } from 'formik'

const CustomInput = ({ label, ...props }) => {

  const [field, meta] = useField(props)

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Input {...field} {...props}/>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomInput