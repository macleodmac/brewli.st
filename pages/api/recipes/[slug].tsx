import type { NextApiRequest, NextApiResponse } from 'next';
import { getRecipe } from './(repository)';

export type RecipeStepResponse = {
  time: number;
  targetWeight?: number;
  description: string;
};
export type RecipeResponse = {
  createdAt: Date;
  slug: string;
  title: string;
  description: string;
  link: string;
  brewTime: number;
  coffee: {
    grams: number;
    grind: string;
    roast: string;
  };
  water: {
    grams: number;
    temperature: number;
  };
  method: RecipeStepResponse[];
};

type NotFoundResponse = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponse | NotFoundResponse>
) {
  const recipe = getRecipe(req.query.slug as string);
  if (recipe === undefined) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  res.status(200).json({
    slug: recipe.slug,
    title: recipe.title,
    createdAt: recipe.createdAt,
    link: recipe.link,
    description: recipe.description,
    brewTime: recipe.brewTime,
    coffee: {
      grams: recipe.coffee.grams,
      grind: recipe.coffee.grind,
      roast: recipe.coffee.roast,
    },
    water: {
      grams: recipe.water.grams,
      temperature: recipe.water.temperature,
    },
    method: recipe.method.map((step) => ({
      time: step.time,
      targetWeight: step.targetWeight,
      description: step.description,
    })),
  });
}
