import { Heading } from '@chakra-ui/react';

interface RecipeTitleProps {
  title: string;
}
export function RecipeTitle({ title }: RecipeTitleProps) {
  return (
    <>
      <Heading
        color={'navy.600'}
        fontSize={{ base: '5xl', md: '5xl', lg: '7xl' }}
        fontWeight="extrabold"
        overflowWrap="break-word"
      >
        {title}
      </Heading>
    </>
  );
}
