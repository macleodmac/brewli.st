import { Box, Center, Flex, HStack, Heading, Text } from '@chakra-ui/react';
import { brewListTheme } from '@src/index';
import Link from 'next/link';
import { BsArrowUpRight } from 'react-icons/bs';
import { Scales } from '../Icon/Icon';
import { BaseCard } from './BaseCard';

export interface RecipeCardProps {
  link: string;
  title: string;
  description: string;
  isNew?: boolean;
  pt?: number;
}

export function FlatCard({
  link,
  title,
  description,
  isNew,
  pt,
}: RecipeCardProps) {
  return (
    <Center pt={pt}>
      <BaseCard mb={4}>
        <Box p={6}>
          {isNew && (
            <BaseCard
              color='green'
              display={'inline-block'}
              px={1}
              py={0}
              mb={1}
            >
              <Text color='green' fontSize='xs'>
                NEW
              </Text>
            </BaseCard>
          )}

          <Link href={link}>
            <Heading color={'navy.600'} fontSize={'2xl'} fontWeight={'bold'}>
              {title}
            </Heading>
          </Link>
          <Text color={'navy.600'} noOfLines={5} mt={2}>
            {description}
          </Text>
        </Box>
        <HStack borderTop={'1px'} color='brown.900' m={0}>
          <Flex
            p={4}
            pl={6}
            alignItems='center'
            justifyContent={'space-between'}
            roundedBottom={'none'}
            borderRight={'1px'}
            cursor={'pointer'}
            w='full'
            as='a'
            href={link}
          >
            <Text fontSize={'lg'} fontWeight={'semibold'} color={'navy.600'}>
              Get Brewing
            </Text>
            <BsArrowUpRight color={brewListTheme.colors.navy[600]} />
          </Flex>
          <Box width='37px' m={0}>
            <Scales
              height={'100%'}
              width={'100%'}
              color={brewListTheme.colors.navy[600]}
              m={0}
            />
          </Box>
        </HStack>
      </BaseCard>
    </Center>
  );
}
