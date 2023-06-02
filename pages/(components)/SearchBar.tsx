import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { BaseCard } from '@src/components/Card/BaseCard';
import { BiFilter } from 'react-icons/bi';

export interface SearchBarProps {
  searchValue: string;
  handleSearchChange: (event: { target: { value: any } }) => void;
  modalOpen: () => void;
}

export function SearchBar({
  searchValue,
  handleSearchChange,
  modalOpen,
}: SearchBarProps) {
  return (
    <Box display='flex' bg='white' position='fixed' w={'100%'}>
      <Container maxW='container.xl' p={4}>
        <BaseCard mb={0} w='full'>
          <HStack>
            <Flex
              p={4}
              alignItems='center'
              justifyContent={'space-between'}
              roundedLeft={'xxs'}
              borderRight={'1px'}
              borderColor={'brown.900'}
              bgColor={'navy.600'}
              textColor={'white'}
              as={'a'}
              href={'/'}
            >
              <Text
                fontSize={'xl'}
                fontWeight={'semibold'}
                textColor={'inherit'}
              >
                brewli.st
              </Text>
            </Flex>
            <Flex
              p={4}
              alignItems='center'
              justifyContent={'space-between'}
              cursor='pointer'
              color={'navy.600'}
              flex={1}
            >
              <Input
                size={'lg'}
                rounded={'none'}
                p={0}
                variant='unstyled'
                placeholder='Search...'
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Flex>
            <Flex
              pr={2}
              alignItems='center'
              justifyContent={'space-between'}
              cursor='pointer'
              color={'navy.600'}
              onClick={modalOpen}
            >
              <IconButton
                variant='ghost'
                aria-label='Filter'
                colorScheme='navy'
                fontSize='24px'
                icon={<BiFilter />}
              />
            </Flex>
          </HStack>
        </BaseCard>
      </Container>
    </Box>
  );
}
