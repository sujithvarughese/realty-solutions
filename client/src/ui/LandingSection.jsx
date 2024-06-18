
import { Box, Container, SimpleGrid } from '@chakra-ui/react'

const LandingSection = (props) => {
  return (
    <SimpleGrid
      minH="xl"
      overflow="hidden"
      width="100%"
      padding={12}
      borderRadius={8}
      alignItems="center"
      justifyContent="center"

      {...props}>
      {props.children}
    </SimpleGrid>
  )
}

export default LandingSection