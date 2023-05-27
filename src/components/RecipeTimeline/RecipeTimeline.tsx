import { RecipeStep, RecipeStepProps } from '../RecipeStep/RecipeStep';

interface RecipeTimelineProps {
  steps: RecipeStepProps[];
}
export function RecipeTimeline({ steps }: RecipeTimelineProps) {
  return (
    <>
      {steps.map((step) => (
        <RecipeStep
          number={step.number}
          time={step.time}
          targetWeight={step.targetWeight}
          description={step.description}
        />
      ))}
    </>
  );
}
