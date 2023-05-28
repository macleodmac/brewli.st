// @ts-nocheck
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import slugify from 'slugify';

export interface MinimalRecipe {
  createdAt: string;
  slug: string;
  title: string;
  description: string;
}

export interface RecipeList {
  recipes: MinimalRecipe[];
}

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

export interface RecipeStep {
  time: number;
  targetWeight?: number;
  description: string;
}

export interface Recipe {
  createdAt: string;
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

class NotionRecipeClient {
  client: Client;
  recipeDatabaseId: string;
  recipeStepsDatabaseId: string;

  constructor(apiKey: string, recipeDatabaseId: string, recipeStepsDatabaseId: string) {
    this.client = new Client({
      auth: apiKey,
    });
    this.recipeDatabaseId = recipeDatabaseId;
    this.recipeStepsDatabaseId = recipeStepsDatabaseId;
  }

  slugifyTitle(title: string): string {
    return slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });
  }

  pickRecipePage(results: PageObjectResponse[], slug: string): PageObjectResponse | undefined {
    for (const page of results) {
      const slugifiedTitle = this.slugifyTitle(page.properties.Name.title[0].plain_text);
      if (slugifiedTitle === slug) {
        return page;
      }
    }
  }

  colonDelimitedTimeToSeconds(delimitedString: string): number {
    var parts = delimitedString.split(':');
    var minutes = parseInt(parts[0], 10);
    var seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  }

  buildRecipeSteps(recipe: PageObjectResponse, steps: PageObjectResponse[]): RecipeStep[] {
    const stepIds = recipe.properties.Steps.relation.map((relation) => relation.id);
    const recipeSteps = steps.filter((step) => stepIds.includes(step.id));
    const formattedSteps = recipeSteps.map((step) => {
      return {
        time: this.colonDelimitedTimeToSeconds(step.properties.Time.rich_text[0].plain_text),
        targetWeight: step.properties.Weight.number,
        description: step.properties.Description.rich_text[0].plain_text,
      };
    });
    formattedSteps.sort((a, b) => a.time - b.time);
    return formattedSteps;
  }

  async getRecipeBySlug(slug: string): Promise<Recipe | undefined> {
    // Get recipes and steps in parallel
    const [recipesResponse, stepsResponse] = await Promise.all([
      this.client.databases.query({
        database_id: this.recipeDatabaseId,
      }),
      this.client.databases.query({
        database_id: this.recipeStepsDatabaseId,
      }),
    ]);

    const recipes = recipesResponse.results as PageObjectResponse[];
    const recipe = this.pickRecipePage(recipes, slug);
    if (!recipe) {
      return;
    }
    const allSteps = stepsResponse.results as PageObjectResponse[];
    const steps = this.buildRecipeSteps(recipe, allSteps);
    console.log(allSteps);
    return {
      createdAt: recipe.created_time,
      slug: slug,
      title: recipe.properties.Name.title[0].plain_text,
      description: recipe.properties.Description.rich_text[0].plain_text,
      link: recipe.properties.Link.url,
      coffee: {
        grams: recipe.properties.CoffeeGrams.number,
        grind: recipe.properties.CoffeeGrind.select.name as CoffeeGrind,
        roast: recipe.properties.CoffeeRoast.select.name as CoffeeRoast,
      },
      water: {
        grams: recipe.properties.WaterGrams.number,
        temperature: recipe.properties.WaterTemperature.number,
      },
      brewTime: recipe.properties.BrewTimeMin.number,
      method: steps,
    };
  }

  async listRecipes(): Promise<RecipeList> {
    const response = await this.client.databases.query({
      database_id: this.recipeDatabaseId,
    });
    const results = response.results as PageObjectResponse[];

    // try catch any errors and ignore
    // Filter where empty object
    const recipes = [];
    results.forEach((page) => {
      try {
        const recipe = {
          createdAt: page.created_time,
          slug: this.slugifyTitle(page.properties.Name.title[0].plain_text),
          title: page.properties.Name.title[0].plain_text,
          description: page.properties.Description.rich_text[0].plain_text,
        };
        recipes.push(recipe);
      } catch (error) {
        // Ignore the error and continue to the next iteration
      }
    });
    return {
      recipes: recipes,
    };
  }
}

export const notionClient = new NotionRecipeClient(
  process.env.NOTION_API_KEY as string,
  process.env.NOTION_RECIPE_DATABASE_ID as string,
  process.env.NOTION_RECIPE_STEPS_DATABASE_ID as string
);
