import { faker } from '@faker-js/faker';

enum CoffeeGrind {
  COARSE = 'coarse',
  MEDIUM = 'medium',
  FINE = 'fine',
}

enum CoffeeRoast {
  LIGHT = 'light',
  MEDIUM = 'medium',
  DARK = 'dark',
}

interface RecipeStep {
  time: number;
  targetWeight?: number;
  description: string;
}

interface Recipe {
  createdAt: Date;
  slug: string;
  title: string;
  link: string;
  description: string;
  coffee: {
    grams: number;
    grind: CoffeeGrind;
    roast: CoffeeRoast;
  };
  water: {
    grams: number;
    temperature: number;
  };
  brewTime: number;
  method: RecipeStep[];
}

faker.seed(42);

const recipeFactory = () => {
  const title = faker.helpers.arrayElement([
    faker.commerce.productAdjective() + ' ' + faker.commerce.productName() + ' Recipe',
    faker.commerce.productAdjective() + ' Recipe',
  ]);
  const brewTime = faker.number.int({ min: 150, max: 260 });
  const waterWeight = faker.number.int({ min: 250, max: 500 });
  const paragraphSize = { min: 2, max: 6 };
  return {
    createdAt: faker.date.recent({ days: 2 }),
    slug: faker.helpers.slugify(title).toLowerCase(),
    title: title,
    link: faker.internet.url(),
    description: faker.lorem.paragraph(10),
    coffee: {
      grams: faker.number.int({ min: 15, max: 30 }),
      grind: faker.helpers.arrayElement(Object.values(CoffeeGrind)),
      roast: faker.helpers.arrayElement(Object.values(CoffeeRoast)),
    },
    water: {
      grams: waterWeight,
      temperature: faker.number.int({ min: 90, max: 100 }),
    },
    brewTime: brewTime,
    method: [
      {
        time: 0,
        targetWeight: faker.number.int({ min: 60, max: 120 }),
        description: faker.lorem.paragraph(paragraphSize),
      },
      {
        time: faker.number.int({ min: 30, max: 60 }),
        targetWeight: faker.number.int({ min: 120, max: 180 }),
        description: faker.lorem.paragraph(paragraphSize),
      },
      {
        time: faker.number.int({ min: 60, max: 120 }),
        targetWeight: faker.number.int({ min: 180, max: 220 }),
        description: faker.lorem.paragraph(paragraphSize),
      },
      {
        time: faker.number.int({ min: 120, max: brewTime }),
        targetWeight: faker.number.int({ min: 220, max: waterWeight }),
        description: faker.lorem.paragraph(paragraphSize),
      },
    ],
  };
};

const NUM_RECIPES = 10;

const RECIPES = new Map<string, Recipe>(
  Array.from({ length: NUM_RECIPES }, () => recipeFactory()).map((recipe) => [recipe.slug, recipe])
);

export function getRecipes(): Recipe[] {
  return Array.from(RECIPES.values());
}

export function getRecipe(slug: string): Recipe | undefined {
  return RECIPES.get(slug);
}
