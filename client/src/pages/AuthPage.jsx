import { Auth } from '../components/index.js'
import { useLocation } from 'react-router-dom'
import { Box, Container, SimpleGrid } from '@chakra-ui/react'

const AuthPage = () => {

  const { state } = useLocation()

  return (
    <SimpleGrid placeItems="center" padding={12}>
      <Auth state={state}/>
    </SimpleGrid>
  )
}

export default AuthPage