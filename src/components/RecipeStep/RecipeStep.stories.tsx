import { Box } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/react';
import { RecipeStep, RecipeStepProps } from './RecipeStep';
import { RecipeStepAlt } from './RecipeStepAlt';

const meta: Meta<typeof RecipeStep> = {
  title: 'Components/RecipeStep',
  component: RecipeStep,
  argTypes: {},
};

export default meta;

const Template: StoryFn<RecipeStepProps> = (args) => (
  <>
    <Box w="700px">
      <RecipeStep {...args} />
      <RecipeStepAlt {...args} />
    </Box>
  </>
);

export const Default = Template.bind({});

Default.args = {
  number: 1,
  time: 120,
  targetWeight: 100,
  description: faker.lorem.paragraph(1),
};
