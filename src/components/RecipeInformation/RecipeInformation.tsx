import { Box, Flex, HStack, Heading, Text } from '@chakra-ui/react';
import { BiLinkExternal } from 'react-icons/bi';
import { BaseCard } from '../Card/BaseCard';

interface RecipeInformationProps {
  description: string;
  link: string;
}

export function RecipeInformation({
  description,
  link,
}: RecipeInformationProps) {
  return (
    <>
      <BaseCard>
        <HStack spacing={0}>
          <Flex
            pb={1}
            pt={3}
            px={3}
            justifyContent={'space-between'}
            alignItems='center'
            w='full'
            // borderRight={'1px'}
          >
            <Heading color={'navy.600'} fontSize={'2xl'} fontWeight={'bold'}>
              Description
            </Heading>
          </Flex>
          <Flex
            pb={1}
            pt={3}
            px={3}
            justifyContent={'space-between'}
            alignItems='center'
            roundedBottom={'none'}
            as={'a'}
            href={link}
          >
            <BiLinkExternal color={'inherit'} fontSize={'24px'} />
          </Flex>
        </HStack>

        <Box pt={1} pb={3} px={3}>
          <Text color={'navy.600'}>{description}</Text>
        </Box>
      </BaseCard>
      {/* <BaseCard>
        <Box p={3} w='full'>
          <Heading color={'navy.600'} fontSize={'2xl'} fontWeight={'bold'}>
            Preparation
          </Heading>
        </Box>
        <Box p={3} w='full' borderTop={'1px'} color='brown.900'>
          <Text color={'navy.600'}>
            If you're using a light roast coffee, you'll want to grind
            medium-fine. If you're using a medium or dark roast, you'll want to
            grind a little coarser.
          </Text>
        </Box>
      </BaseCard> */}
    </>
  );
}
