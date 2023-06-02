import { Box, Container, Spacer, useDisclosure } from '@chakra-ui/react';
import { FlatCard } from '@src/components/Card/FlatCard';
import { FilterStates, SearchModal } from '@src/components/Search/SearchModal';
import { MinimalRecipe, notionClient } from '@src/notion';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SearchBar } from '../src/components/Search/SearchBar';

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
  const [searchValue, setSearchValue] = useState(initialFilter || '');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  // TODO: handle debounce
  // TODO: make search bar fixed on scroll
  const handleSearchValueChange = (filter: string) => {
    setSearchValue(filter);
    const filteredItems = initialRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredRecipes(filteredItems);
    router.replace({
      query: { ...router.query, q: filter },
    });
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    console.log(event.target.value);
    const inputValue = event.target.value;
    handleSearchValueChange(inputValue);
  };

  const handleModalSave = (filterStates: FilterStates) => {
    var cups = [];
    if (filterStates.oneCup) {
      cups.push('one');
    }
    if (filterStates.twoCup) {
      cups.push('two');
    }
    var roast = [];
    if (filterStates.lightRoast) {
      roast.push('light');
    }
    if (filterStates.mediumRoast) {
      roast.push('medium');
    }
    if (filterStates.darkRoast) {
      roast.push('dark');
    }
    router.replace({
      query: { ...router.query, cups, roast },
    });
  };

  return (
    <>
      <Box position='relative'>
        <SearchBar
          searchValue={searchValue}
          handleSearchChange={handleInputChange}
          modalOpen={onOpen}
        />
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
      <SearchModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleModalSave}
        initialStates={{
          oneCup: false,
          twoCup: false,
          lightRoast: false,
          mediumRoast: false,
          darkRoast: false,
        }}
      />
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
