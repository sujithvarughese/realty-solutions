import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <HStack
      bgColor="lightblue"
      color="white"
      width="100%"
      padding={12}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text>LeaseLink 2024</Text>
    </HStack>
  )
}

export default Footer