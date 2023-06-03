import {
  Box,
  HStack,
  Heading,
  Icon,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BiStopwatch, BiTargetLock } from 'react-icons/bi';
import { BaseCard } from '../Card/BaseCard';
import {
  RecipeStepAlt,
  formatMinutesSeconds,
} from '../RecipeStep/RecipeStepAlt';

interface RecipeTimelineStepProps {
  number: number;
  time?: number;
  targetWeight?: number;
  description: string;
}
interface RecipeTimelineProps {
  prepStep: string;
  steps: RecipeTimelineStepProps[];
}
export function RecipeTimeline({ steps, prepStep }: RecipeTimelineProps) {
  return (
    <>
      <BaseCard>
        <VStack
          p={3}
          spacing={3}
          divider={<StackDivider borderColor={'rgba(40, 64, 82, 0.3)'} />}
        >
          {steps.map((step, index) => (
            <Box width={'100%'}>
              <HStack width='100%' spacing={3} pb={1}>
                <Heading fontSize='2xl' whiteSpace='nowrap' minW={'10%'}>
                  {'Step ' + (index + 1)}
                </Heading>
                <Box display={'flex'} minW={'10%'}>
                  {step.time !== undefined && (
                    <>
                      <Icon as={BiStopwatch} boxSize={6} mr={1} />
                      <Text fontWeight={'semibold'}>
                        {formatMinutesSeconds(step.time)}
                      </Text>
                    </>
                  )}
                </Box>
                <Box display={'flex'}>
                  {step.targetWeight && (
                    <>
                      <Icon as={BiTargetLock} boxSize={6} mr={1} />
                      <Text fontWeight={'semibold'}>
                        {step.targetWeight + 'g'}
                      </Text>
                    </>
                  )}
                </Box>
              </HStack>
              <Box width={'100%'}>
                <Text>{step.description}</Text>
              </Box>
            </Box>
          ))}
        </VStack>
      </BaseCard>
    </>
  );
}

export function RecipeTimelineOld({ steps, prepStep }: RecipeTimelineProps) {
  return (
    <>
      {steps.map((step) => (
        <RecipeStepAlt
          title={'Step ' + step.number}
          time={step.time}
          targetWeight={step.targetWeight}
          description={step.description}
        />
      ))}
    </>
  );
}
