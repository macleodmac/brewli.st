import { Box, useDisclosure } from '@chakra-ui/react';

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {/* <Flex minH={'60px'} py={{ base: 2 }} px={{ base: 4 }} align={'center'} alignItems="center">
        {/* <Flex>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            fontSize={28}
            fontWeight={400}
            as={'a'}
            href={'/'}
          >
            brewli.st
          </Text>
        </Flex>
        <Container
        <BaseCard mb={0} w={'container.xl'}>
          <Input size={'lg'} p={4} variant="flushed" placeholder="Search..." />
        </BaseCard>

        <Stack direction={'row'}>Hello</Stack>
      </Flex> */}
    </Box>
  );
}
