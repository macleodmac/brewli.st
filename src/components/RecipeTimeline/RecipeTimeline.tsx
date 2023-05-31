import { RecipeStepAlt } from '../RecipeStep/RecipeStepAlt';

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
