import { Box, HStack, Icon, TagProps, Text, Tooltip } from '@chakra-ui/react';
import { BaseCard } from '../Card/BaseCard';

export interface IconBadgeProps extends TagProps {
  icon: React.ComponentType;
  text: string;
  color: string;
  tooltip?: string;
  animateOnActive?: boolean;
  isActive?: boolean;
}

export function IconBadge({
  icon,
  text,
  color,
  tooltip,
  animateOnActive,
  isActive,
  ...props
}: IconBadgeProps) {
  const dynamicColor = isActive || !animateOnActive ? color : 'gray.500';

  if (dynamicColor.includes('.')) {
    var boxColor = `var(--chakra-colors-${color.replace('.', '-')})`;
  } else {
    var boxColor = dynamicColor;
  }
  const activeAnimationProps = animateOnActive
    ? {
        _active: {
          boxShadow: `2px 2px 0 ${boxColor}`,
          transform: 'translate(2px, 2px)',
        },
        cursor: 'pointer',
      }
    : {};

  return (
    <BaseCard
      color={dynamicColor}
      display={'inline-block'}
      mr={4}
      mb={2}
      {...activeAnimationProps}
      {...props}
    >
      <Tooltip
        label={tooltip}
        hasArrow
        arrowSize={15}
        placement='bottom'
        isDisabled={!tooltip}
      >
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
            <Icon as={icon} color={dynamicColor} w={5} h={5} />
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
              <Text
                color={dynamicColor}
                fontWeight={'medium'}
                fontSize={'medium'}
              >
                {text}
              </Text>
            </Box>
          )}
        </HStack>
      </Tooltip>
    </BaseCard>
  );
}
