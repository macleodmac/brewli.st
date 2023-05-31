import {
  Box,
  Container,
  Flex,
  HStack,
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { BaseCard } from '@src/components/Card/BaseCard';
import { FlatCard } from '@src/components/Card/FlatCard';
import { MinimalRecipe, notionClient } from '@src/notion';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface HomePageProps {
  initialRecipes: MinimalRecipe[];
  initialFilteredRecipes: MinimalRecipe[];
  initialFilter?: string;
}

export default function HomePage({
  recipeProps: { initialRecipes, initialFilteredRecipes, initialFilter },
}: {
  recipeProps: HomePageProps;
}) {
  const [filteredRecipes, setFilteredRecipes] = useState<MinimalRecipe[]>(
    initialFilteredRecipes
  );
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
    if (filter !== '') {
      router.replace({
        query: { q: filter },
      });
    }
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    const inputValue = event.target.value;
    handleFilterChange(inputValue);
  };

  return (
    <>
      <Box position='relative'>
        <Box display='flex' bg='white' position='fixed' w={'100%'}>
          <Container maxW='container.xl' p={4}>
            <BaseCard mb={0} w='full'>
              <HStack>
                <Flex
                  p={4}
                  alignItems='center'
                  justifyContent={'space-between'}
                  roundedLeft={'xxs'}
                  borderRight={'1px'}
                  borderColor={'brown.900'}
                  bgColor={'navy.600'}
                  textColor={'white'}
                  as={'a'}
                  href={'/'}
                >
                  <Text
                    fontSize={'xl'}
                    fontWeight={'semibold'}
                    textColor={'inherit'}
                  >
                    brewli.st
                  </Text>
                </Flex>
                <Flex
                  p={4}
                  alignItems='center'
                  justifyContent={'space-between'}
                  cursor='pointer'
                  color={'navy.600'}
                  flex={1}
                >
                  <Input
                    size={'lg'}
                    rounded={'none'}
                    p={0}
                    variant='unstyled'
                    placeholder='Search...'
                    value={filter}
                    onChange={handleInputChange}
                  />
                </Flex>
              </HStack>
            </BaseCard>
          </Container>
        </Box>
        <Spacer h={24} />
        <Box pb={8}>
          <Container
            maxW='container.xl'
            columnGap={9}
            // @ts-ignore
            sx={{ columnCount: { base: [1], md: [1, 2] } }}
          >
            {filteredRecipes &&
              filteredRecipes.map((recipe) => (
                <FlatCard
                  link={'/recipes/' + recipe.slug}
                  key={recipe.title}
                  title={recipe.title}
                  description={recipe.description}
                  // isNew={recipe.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24)}
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
}> = async ({ query, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=300'
  );

  const { q } = query;
  const data = await notionClient.listRecipes();
  var filteredRecipes = data.recipes;
  if (q) {
    const filteredItems = data.recipes.filter((recipe: MinimalRecipe) =>
      recipe.title.toLowerCase().includes(q.toString().toLowerCase())
    );
    filteredRecipes = filteredItems;
  }
  return {
    props: {
      recipeProps: {
        initialRecipes: data.recipes,
        initialFilteredRecipes: filteredRecipes,
        initialFilter: (q as string) || '',
      },
    },
  };
};
