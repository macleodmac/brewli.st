import { useRouter } from 'next/router';
import { RecipeResponse } from 'pages/api/recipes/[slug]';
import { useEffect, useState } from 'react';

import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { IconBadge } from '@src/components/IconBadge/IconBadge';
import { RecipeInformation } from '@src/components/RecipeInformation/RecipeInformation';
import { RecipeTags } from '@src/components/RecipeTags/RecipeTags';
import { RecipeTimeline } from '@src/components/RecipeTimeline/RecipeTimeline';
import { RecipeTitle } from '@src/components/Title/Title';
import { BiArrowBack } from 'react-icons/bi';

// TODO: add dark mode
export default function Page() {
  const router = useRouter();
  // Fetch recipe from API and set it on state
  const [recipe, setRecipe] = useState<RecipeResponse | undefined>(undefined);
  const [referrer, setReferrer] = useState('');
  useEffect(() => {
    async function fetchRecipe() {
      const response = await fetch('/api/recipes/' + router.query.slug);
      const data = await response.json();
      setRecipe(data);
    }
    fetchRecipe();
    if (document.referrer) {
      setReferrer(document.referrer);
    } else {
      setReferrer(router.asPath);
    }
  }, [router.query.slug]);

  return (
    // TODO make back arrow smaller and inline
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        m="6"
        display={{ base: 'none', md: 'inline-block' }}
        as={'a'}
        href={referrer}
      >
        <IconBadge text={''} icon={BiArrowBack} color={'brown.900'} />
      </Box>
      {recipe && recipe.method && (
        <Container maxW="container.xl" pt={2}>
          <Grid templateColumns="repeat(3, 1fr)" rowGap={2} columnGap={5}>
            <GridItem w="100%" colSpan={3}>
              <RecipeTitle title={recipe.title} />
            </GridItem>
            <GridItem w="100%" colSpan={3}>
              <RecipeTags
                brewTime={recipe.brewTime}
                coffeeWeight={recipe.coffee.grams}
                coffeeGrind={recipe.coffee.grind}
                coffeeRoast={recipe.coffee.roast}
                waterWeight={recipe.water.grams}
                waterTemp={recipe.water.temperature}
              />
            </GridItem>

            <GridItem colSpan={{ base: 3, md: 1 }}>
              <RecipeInformation description={recipe.description} link={recipe.link} />
            </GridItem>
            <GridItem colSpan={{ base: 3, md: 2 }}>
              <RecipeTimeline
                steps={recipe.method.map((step, index) => ({
                  number: index + 1,
                  time: step.time,
                  targetWeight: step.targetWeight,
                  description: step.description,
                }))}
              />
            </GridItem>
          </Grid>
        </Container>
      )}
    </>
  );
}
