import { Box, BoxProps } from '@chakra-ui/react';

export interface BaseCardProps extends BoxProps {
  children: React.ReactNode;
  color?: string;
}

export function BaseCard({ children, color, ...props }: BaseCardProps) {
  color = color || 'brown.900';

  if (color.includes('.')) {
    var boxColor = `var(--chakra-colors-${color.replace('.', '-')})`;
  } else {
    var boxColor = color;
  }
  return (
    <Box
      rounded={'sm'}
      mb={4}
      overflow={'hidden'}
      bg='white'
      border={'1px'}
      borderColor={color}
      boxShadow={`4px 4px 0 ${boxColor}`}
      {...props}
    >
      {children}
    </Box>
  );
}
