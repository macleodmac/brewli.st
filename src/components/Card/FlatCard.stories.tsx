import { faker } from '@faker-js/faker';
import { Meta, StoryFn } from '@storybook/react';
import { FlatCard, RecipeCardProps } from './FlatCard';

const meta: Meta<typeof FlatCard> = {
  title: 'Components/FlatCard',
  component: FlatCard,
  argTypes: {},
};

export default meta;

const Template: StoryFn<RecipeCardProps> = (args) => <FlatCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  link: 'https://google.com',
  title: faker.commerce.productAdjective() + ' ' + faker.commerce.productName() + ' Recipe',
  description: faker.lorem.paragraph(5),
  isNew: true,
};
