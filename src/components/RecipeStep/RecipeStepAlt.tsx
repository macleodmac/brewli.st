import { Box, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react';
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

export function RecipeStepAlt({ number, time, targetWeight, description }: RecipeStepProps) {
  return (
    <>
      <BaseCard>
        <VStack height="100%" spacing={0} p={2.5}>
          <HStack width="100%" spacing={3} pb={1}>
            <Heading fontSize="2xl" whiteSpace="nowrap" minW={'10%'}>
              Step {number}
            </Heading>
            <Box display={'flex'} minW={'10%'}>
              <Icon as={BiStopwatch} boxSize={6} mr={1} />
              <Text fontWeight={'semibold'}>{formatMinutesSeconds(time)}</Text>
            </Box>
            <Box display={'flex'}>
              {targetWeight && (
                <>
                  <Icon as={BiTargetLock} boxSize={6} mr={1} />
                  <Text fontWeight={'semibold'}>{targetWeight + 'g'}</Text>
                </>
              )}
            </Box>
          </HStack>
          <Box width={'100%'}>
            <Text>{description}</Text>
          </Box>
        </VStack>
      </BaseCard>
    </>
  );
}
