import { Box, Center, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { BiStopwatch, BiTargetLock } from 'react-icons/bi';
import { BaseCard } from '../Card/BaseCard';

export interface RecipeStepProps {
  number: number;
  time: number;
  targetWeight?: number;
  description: string;
}

export function formatMinutesSeconds(s: number) {
  return (s - (s %= 60)) / 60 + (9 < s ? "'" : "'0") + s + '"';
}

export function RecipeStep({ number, time, targetWeight, description }: RecipeStepProps) {
  return (
    <>
      <BaseCard display={'flex'}>
        <HStack spacing={0} minHeight="100px" display="flex">
          <Box
            p={1.5}
            borderRight={'1px'}
            borderColor={'brown.900'}
            height="100%"
            display="flex"
            alignItems="center"
          >
            <Heading
              fontSize="2xl"
              sx={{
                writingMode: 'vertical-lr',
                textOrientation: 'mixed',
                transform: 'rotate(-180deg)',
                whiteSpace: 'nowrap',
              }}
            >
              Step {number}
            </Heading>
          </Box>
          <VStack
            height="100%"
            minWidth={'80px'}
            spacing={0}
            borderRight={'1px'}
            borderColor={'brown.900'}
          >
            <Box
              height="50%"
              borderBottom={'1px'}
              borderColor={'brown.900'}
              p={1.5}
              display="flex"
              width={'100%'}
            >
              <Center>
                <Icon as={BiStopwatch} boxSize={6} mr={1} />
                <Text fontWeight={'semibold'}>{formatMinutesSeconds(time)}</Text>
              </Center>
            </Box>
            <Box height="50%" p={1.5} display="flex" width={'100%'}>
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
      </BaseCard>
    </>
  );
}
