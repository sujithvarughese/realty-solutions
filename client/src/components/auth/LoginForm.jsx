import { Form, Formik } from 'formik'
import { loginSchema } from '../../schemas/index.js'
import useAxios from '../../hooks/useAxios.js'
import CustomInput from '../../ui/CustomInput.jsx'
import { useGlobalContext } from '../../context/GlobalContext.jsx'
import { Button, ButtonGroup, VStack } from '@chakra-ui/react'

const credentials = {
  email: import.meta.env.VITE_ADMIN_LOGIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}
const LoginForm = () => {

  const { login } = useGlobalContext()

  const { response, error, loading, submitData } = useAxios({
    method: "post",
    url: "/auth/login",
  })

  const demo = async () => {
    try {
      await submitData(credentials)
      login(response.user)
    } catch (err) {
      console.log(error)
    }
  }

  const handleSubmit = async (values, actions) => {
    try {
      await submitData(credentials)
      login(response.user)
    } catch (err) {
      console.log(error)
    } finally {
      actions.resetForm()
    }
  }

  return (
    <Formik
      initialValues={{ email: "", password: ""}}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {
        props => (
          <Form>
            <VStack marginTop="56px">
              <CustomInput label="Email" name="email" type="email" placeholder="Enter email"/>
              <CustomInput label="Password" name="password" type="password" placeholder="Enter password"/>

              <ButtonGroup marginTop="48px">
                <Button type="submit" variant="outline" backgroundColor="var(--COLOR-DARK)"  color="white" isLoading={loading}>Log In</Button>
                <Button type="click" onClick={demo} backgroundColor="var(--COLOR-DARK)" color="white" isLoading={loading}>Demo</Button>
              </ButtonGroup>

            </VStack>
          </Form>
        )
      }

    </Formik>
  )
}

export default LoginForm


