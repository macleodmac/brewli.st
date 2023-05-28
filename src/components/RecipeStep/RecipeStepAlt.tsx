import { Box, Center, Flex, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { BiStopwatch, BiTargetLock } from 'react-icons/bi';
import { BaseCard } from '../Card/BaseCard';
import { IconBadge } from '../IconBadge/IconBadge';

export interface RecipeStepProps {
  number: number;
  time: number;
  targetWeight?: number;
  description: string;
}

export function formatMinutesSeconds(s: number) {
  return (s - (s %= 60)) / 60 + (9 < s ? "'" : "'0") + s + '"';
}

export function RecipeStepAlt({ number, time, targetWeight, description }: RecipeStepProps) {
  return (
    <>
      <Flex width={'100%'} height={'100%'}>
        <BaseCard minH="100%" mb={0} mr={2}>
          <Heading p={1.5} fontSize="2xl" width={'100%'} whiteSpace="nowrap">
            {number}
          </Heading>
        </BaseCard>
        <VStack minH="100%" display={'flex'}>
          <IconBadge
            icon={BiStopwatch}
            text={formatMinutesSeconds(time)}
            color="navy.600"
            h={'50%'}
          />
          <IconBadge icon={BiTargetLock} text={targetWeight + 'g'} color="navy.600" h={'50%'} />
        </VStack>
        <BaseCard flex={1} minH="100%" mb={0}>
          <Text p="3">{description}</Text>
        </BaseCard>
      </Flex>
      <BaseCard display={'flex'}>
        <HStack spacing={0} minHeight="100px" display="flex">
          <VStack
            height="100%"
            spacing={0}
            borderRight={'1px'}
            borderColor={'brown.900'}
            display="flex"
          >
            <Heading
              p={1.5}
              fontSize="2xl"
              borderBottom={'1px'}
              borderColor={'brown.900'}
              width={'100%'}
              whiteSpace="nowrap"
            >
              Step {number}
            </Heading>
            <Box p={1.5} display="flex" width={'100%'}>
              <Center>
                <Icon as={BiStopwatch} boxSize={6} mr={1} />
                <Text fontWeight={'semibold'}>{formatMinutesSeconds(time)}</Text>
              </Center>
            </Box>
            <Box p={1.5} display="flex" width={'100%'}>
              {targetWeight && (
                <>
                  <Center>
                    <Icon as={BiTargetLock} boxSize={6} mr={1} />
                    <Text fontWeight={'semibold'}>{targetWeight + 'g'}</Text>
                  </Center>
                </>
              )}
            </Box>
          </VStack>
          <Text p="3">{description}</Text>
        </HStack>

        {/* </HStack> */}
      </BaseCard>
    </>
  );
}
