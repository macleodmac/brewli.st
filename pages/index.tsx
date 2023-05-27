import { Box, Container, Flex, HStack, Input, Spacer, Text } from '@chakra-ui/react';
import { BaseCard } from '@src/components/Card/BaseCard';
import { FlatCard } from '@src/components/Card/FlatCard';
import { buildUrl } from '@src/utils';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RecipeResponse } from './api/recipes/[slug]';

interface HomePageProps {
  initialRecipes: RecipeResponse[];
  initialFilteredRecipes: RecipeResponse[];
  initialFilter?: string;
}

export default function HomePage({
  recipeProps: { initialRecipes, initialFilteredRecipes, initialFilter },
}: {
  recipeProps: HomePageProps;
}) {
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeResponse[]>(initialFilteredRecipes);
  const [filter, setFilter] = useState(initialFilter || '');

  const router = useRouter();

  // TODO: handle debounce
  // TODO: make search bar fixed on scroll
  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    const filteredItems = initialRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredRecipes(filteredItems);
    router.replace({
      query: { q: filter },
    });
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    const inputValue = event.target.value;
    handleFilterChange(inputValue);
  };

  return (
    <>
      <Box position="relative">
        <Box display="flex" bg="white" p={4} position="fixed" w={'100%'}>
          <BaseCard mb={0} w="full">
            <HStack>
              <Flex
                p={4}
                alignItems="center"
                justifyContent={'space-between'}
                // roundedBottom={'none'}
                roundedLeft={'xxs'}
                borderRight={'1px'}
                borderColor={'brown.900'}
                cursor={'pointer'}
                bgColor={'navy.600'}
                textColor={'white'}
              >
                <Text fontSize={'xl'} fontWeight={'semibold'} textColor={'inherit'}>
                  brewli.st
                </Text>
              </Flex>
              <Flex
                p={4}
                alignItems="center"
                justifyContent={'space-between'}
                cursor="pointer"
                color={'navy.600'}
                flex={1}
              >
                <Input
                  size={'lg'}
                  rounded={'none'}
                  p={0}
                  variant="unstyled"
                  placeholder="Search..."
                  value={filter}
                  onChange={handleInputChange}
                />
              </Flex>
            </HStack>
          </BaseCard>
        </Box>
        <Spacer h={24} />

        <Box pb={8}>
          <Container maxW="container.xl" columnGap={9} sx={{ columnCount: [1, 2] }}>
            {filteredRecipes &&
              filteredRecipes.map((recipe) => (
                <FlatCard
                  link={'/recipes/' + recipe.slug}
                  key={recipe.title}
                  title={recipe.title}
                  description={recipe.description}
                  isNew={recipe.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24)}
                />
              ))}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  recipeProps: HomePageProps;
}> = async ({ query }) => {
  const { q } = query;
  const response = await fetch(buildUrl('/api/recipes'));
  const data = await response.json();
  var filteredRecipes = data.recipes;
  if (q) {
    const filteredItems = data.recipes.filter((recipe: RecipeResponse) =>
      recipe.title.toLowerCase().includes(q.toString().toLowerCase())
    );
    filteredRecipes = filteredItems;
  }
  return {
    props: {
      recipeProps: {
        initialRecipes: data.recipes,
        initialFilteredRecipes: filteredRecipes,
        initialFilter: q as string,
      },
    },
  };
};
