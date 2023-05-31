import { Box } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/react';
import { RecipeStepAlt, RecipeStepProps } from './RecipeStepAlt';

const meta: Meta<typeof RecipeStepAlt> = {
  title: 'Components/RecipeStep',
  component: RecipeStepAlt,
  argTypes: {},
};

export default meta;

const Template: StoryFn<RecipeStepProps> = (args) => (
  <>
    <Box w='700px'>
      <RecipeStepAlt {...args} />
    </Box>
  </>
);

export const Default = Template.bind({});

Default.args = {
  title: 'My step',
  time: 120,
  targetWeight: 100,
  description: faker.lorem.paragraph(1),
};
