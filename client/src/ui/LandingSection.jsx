
import { Box, Container } from '@chakra-ui/react'

const LandingSection = (props) => {
  return (
    <Box
      height="xl"
      overflow="hidden"
      width="100%"
      borderRadius={8}
      padding={12}
      {...props}>
      {props.children}
    </Box>
  )
}

export default LandingSection