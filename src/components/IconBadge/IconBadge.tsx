import { Box, HStack, Icon, TagProps, Text } from '@chakra-ui/react';
import { BaseCard } from '../Card/BaseCard';
export interface IconBadgeProps extends TagProps {
  icon: React.ComponentType;
  text: string;
  color: string;
}

export function IconBadge({ icon, text, color, ...props }: IconBadgeProps) {
  return (
    <BaseCard color={color} display={'inline-block'} mr={4} mb={2}>
      {/* <Tag size="lg" rounded="sm" alignItems={'center'} variant={'outline'} {...props}>
      <Icon as={icon} boxSize={5} mr={1} ml={-1} />
      <TagLabel>{text}</TagLabel>
    </Tag> */}
      <HStack spacing={0} minHeight='20px' display='flex'>
        <Box
          pt={1.5}
          pr={text ? 0.5 : 2}
          pb={1.5}
          pl={2}
          height='100%'
          display='flex'
          alignItems='center'
        >
          <Icon as={icon} color={color} w={5} h={5} />
        </Box>
        {text && (
          <Box
            pt={1.5}
            pr={2}
            pb={1.5}
            pl={1}
            height='100%'
            display='flex'
            alignItems='center'
          >
            <Text color={color} fontWeight={'medium'} fontSize={'medium'}>
              {text}
            </Text>
          </Box>
        )}
      </HStack>
    </BaseCard>
  );
}
