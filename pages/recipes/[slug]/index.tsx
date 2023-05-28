import { useRouter } from 'next/router';
import { useState } from 'react';

import { Container, Grid, GridItem } from '@chakra-ui/react';
import { RecipeInformation } from '@src/components/RecipeInformation/RecipeInformation';
import { RecipeTags } from '@src/components/RecipeTags/RecipeTags';
import { RecipeTimeline } from '@src/components/RecipeTimeline/RecipeTimeline';
import { RecipeTitle } from '@src/components/Title/Title';
import { Recipe, notionClient } from '@src/notion';
import { GetServerSideProps, GetStaticPaths } from 'next';

interface RecipePageProps {
  recipe: Recipe;
}

// TODO: add dark mode
export default function Page({ recipe }: RecipePageProps) {
  const router = useRouter();
  // Fetch recipe from API and set it on state
  const [referrer, setReferrer] = useState('');

  return (
    // TODO make back arrow smaller and inline
    <>
      {/* <Box
        position="fixed"
        top="0"
        left="0"
        m="6"
        display={{ base: 'none', md: 'inline-block' }}
        as={'a'}
        href={referrer}
      >
        <IconBadge text={''} icon={BiArrowBack} color={'brown.900'} />
      </Box> */}
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

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const recipe = await notionClient.getRecipeBySlug(params?.slug as string);
  return { props: { recipe: recipe }, revalidate: 600 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await notionClient.listRecipes();
  const paths = recipes.recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));
  return { paths: paths, fallback: 'blocking' };
};
