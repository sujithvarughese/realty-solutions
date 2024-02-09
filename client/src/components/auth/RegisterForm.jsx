import { Form, Formik } from 'formik'
import { registerSchema } from '../../schemas/index.js'
import useAxios from '../../hooks/useAxios.js'
import CustomInput from '../../ui/CustomInput.jsx'
import { useGlobalContext } from '../../context/GlobalContext.jsx'
import { Button, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'

const RegisterForm = () => {

  const { login } = useGlobalContext()

  const { response, error, loading, submitData } = useAxios({
    method: "post",
    url: "/auth/register",
  })

  const handleSubmit = async (values, actions) => {
    try {
      await submitData({
        method: "post",
        url: "/auth/register",
        requestConfig: values
      })
    } catch (err) {
      console.log(error.message)
    } finally {
      actions.resetForm()
    }
  }

  useEffect(() => {
    if (response !== null) login(response.user)
  }, [response])

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: ""}}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {
        props => (
          <Form>
            <VStack marginTop="8px">
              <CustomInput label="First Name" name="firstName" type="text" placeholder="Enter first name"/>
              <CustomInput label="Last Name" name="lastName" type="text" placeholder="Enter last name"/>
              <CustomInput label="Email" name="email" type="email" placeholder="Enter email"/>
              <CustomInput label="Password" name="password" type="password" placeholder="Enter password"/>
              <CustomInput label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm password"/>

              <Button type="submit" color="white" sx={{ backgroundColor: "var(--COLOR-DARK)" }} boxShadow="dark-md" isLoading={loading}>Register</Button>
            </VStack>
          </Form>
        )
      }
    </Formik>
  )
}

export default RegisterForm