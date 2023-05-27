import type { NextApiRequest, NextApiResponse } from 'next';
import { getRecipes } from './(repository)';

interface MinimalRecipeResponse {
  createdAt: Date;
  slug: string;
  title: string;
  description: string;
}

export interface RecipeListResponse {
  recipes: MinimalRecipeResponse[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<RecipeListResponse>) {
  const recipes = getRecipes();
  const response: RecipeListResponse = {
    recipes: Array.from(recipes.values()).map((recipe) => ({
      createdAt: recipe.createdAt,
      slug: recipe.slug,
      title: recipe.title,
      description: recipe.description,
    })),
  };
  res.status(200).json(response);
}
