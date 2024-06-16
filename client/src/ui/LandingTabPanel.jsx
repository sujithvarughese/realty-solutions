import { Box, Heading, HStack, Image, TabPanel, Text } from '@chakra-ui/react'

const LandingTabPanel = ({ heading, text, image }) => {
  return (
    <TabPanel>
      <HStack>
        <Box width="50%">
          <Heading>{heading}</Heading>
          <Text>{text}</Text>
        </Box>
        <Box width="50%">
          <Image src={image} alt={image} />
        </Box>
      </HStack>
    </TabPanel>
  )
}

export default LandingTabPanel