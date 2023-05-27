import { Box, Flex, HStack, Heading, Text } from '@chakra-ui/react';
import { BiLinkExternal } from 'react-icons/bi';
import { BaseCard } from '../Card/BaseCard';

interface RecipeInformationProps {
  description: string;
  link: string;
}

export function RecipeInformation({ description, link }: RecipeInformationProps) {
  return (
    <>
      <BaseCard>
        <HStack spacing={0}>
          <Flex
            p={3}
            justifyContent={'space-between'}
            alignItems="center"
            w="full"
            borderRight={'1px'}
          >
            <Heading color={'navy.600'} fontSize={'2xl'} fontWeight={'bold'}>
              Description
            </Heading>
          </Flex>
          <Flex
            p={3}
            justifyContent={'space-between'}
            alignItems="center"
            roundedBottom={'none'}
            as={'a'}
            href={link}
          >
            <BiLinkExternal color={'inherit'} fontSize={'24px'} />
          </Flex>
        </HStack>

        <Box p={3} borderTop={'1px'} color="brown.900">
          <Text color={'navy.600'}>{description}</Text>
        </Box>
      </BaseCard>
    </>
  );
}
