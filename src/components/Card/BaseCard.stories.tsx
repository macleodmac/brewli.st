import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import { FaClock } from 'react-icons/fa';
import { BaseCard, BaseCardProps } from './BaseCard';

const meta: Meta<typeof BaseCard> = {
  title: 'Components/BaseCard',
  component: BaseCard,
  argTypes: {},
};

export default meta;

const Template: StoryFn<BaseCardProps> = (args) => (
  <>
    <BaseCard {...args} />
  </>
);

export const Default = Template.bind({});

const myColor = 'green.500';
Default.args = {
  children: (
    <>
      <HStack spacing={0} minHeight="20px" display="flex">
        <Box pt={1.5} pr={1} pb={1.5} pl={2} height="100%" display="flex" alignItems="center">
          <Icon as={FaClock} color={myColor} />
        </Box>
        <Box pt={1.5} pr={2} pb={1.5} pl={1} height="100%" display="flex" alignItems="center">
          <Text color={myColor} fontWeight={'medium'} fontSize={'medium'}>
            Icon
          </Text>
        </Box>
      </HStack>
    </>
  ),
  color: myColor,
  display: 'inline-block',
};
