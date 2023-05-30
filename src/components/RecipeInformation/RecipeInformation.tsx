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
            p={3}
            justifyContent={'space-between'}
            alignItems='center'
            w='full'
            borderRight={'1px'}
          >
            <Heading color={'navy.600'} fontSize={'2xl'} fontWeight={'bold'}>
              Description
            </Heading>
          </Flex>
          <Flex
            p={3}
            justifyContent={'space-between'}
            alignItems='center'
            roundedBottom={'none'}
            as={'a'}
            href={link}
          >
            <BiLinkExternal color={'inherit'} fontSize={'24px'} />
          </Flex>
        </HStack>

        <Box p={3} borderTop={'1px'} color='brown.900'>
          <Text color={'navy.600'}>{description}</Text>
        </Box>
      </BaseCard>
      {/* <BaseCard>
        <Flex p={3} w='full'>
          <Heading color={'navy.600'} fontSize={'2xl'} fontWeight={'bold'}>
            Equipment
          </Heading>
        </Flex>

        <HStack spacing={0} borderTop={'1px'} color='brown.900'>
          <Flex
            p={1}
            justifyContent={'center'}
            alignItems='center'
            roundedBottom={'none'}
            borderRight={'1px'}
            width={'25%'}
          >
            <SvgFiltercone
              // strokeWidth={10}
              width={'90%'}
              height={'90%'}
              fill={brewListTheme.colors.navy[600]}
              // style={{ marginLeft: '0.35rem', marginRight: '0.35rem' }}
            />
          </Flex>

          <Flex
            p={3}
            justifyContent={'space-between'}
            alignItems='center'
            w='full'
          >
            <Text color={'navy.600'}>Ceramic V60</Text>
          </Flex>
        </HStack>
      </BaseCard> */}
    </>
  );
}
