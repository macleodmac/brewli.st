import { RecipeStepAlt, RecipeStepProps } from '../RecipeStep/RecipeStepAlt';

interface RecipeTimelineProps {
  steps: RecipeStepProps[];
}
export function RecipeTimeline({ steps }: RecipeTimelineProps) {
  return (
    <>
      {steps.map((step) => (
        <RecipeStepAlt
          key={step.number}
          number={step.number}
          time={step.time}
          targetWeight={step.targetWeight}
          description={step.description}
        />
      ))}
    </>
  );
}
