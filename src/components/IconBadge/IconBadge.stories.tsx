import { Meta, StoryFn } from '@storybook/react';
import { FaCoffee } from 'react-icons/fa';
import { IconBadge, IconBadgeProps } from './IconBadge';

const meta: Meta<typeof IconBadge> = {
  title: 'Components/IconBadge',
  component: IconBadge,
  argTypes: {},
};

export default meta;

const Template: StoryFn<IconBadgeProps> = (args) => <IconBadge {...args} />;

export const Default = Template.bind({});

Default.args = {
  icon: FaCoffee,
  text: 'Coffee',
};
