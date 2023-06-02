import { BiTimeFive } from 'react-icons/bi';
import { FaThermometerThreeQuarters } from 'react-icons/fa';
import { TbColorFilter, TbDroplet, TbFlame, TbWeight } from 'react-icons/tb';
import { IconBadge } from '../IconBadge/IconBadge';
import { formatMinutesSeconds } from '../RecipeStep/RecipeStepAlt';

interface RecipeTagsProps {
  brewTime: number;
  coffeeWeight: number;
  coffeeGrind: string;
  coffeeRoast: string;
  waterWeight: number;
  waterTemp: number;
}

export function RecipeTags({
  brewTime,
  coffeeWeight,
  coffeeGrind,
  coffeeRoast,
  waterWeight,
  waterTemp,
}: RecipeTagsProps) {
  return (
    <>
      <IconBadge text={coffeeWeight + 'g'} icon={TbWeight} color='orange.600' />
      <IconBadge
        text={coffeeRoast}
        icon={TbFlame}
        color='orange.600'
        tooltip={'Roast'}
      />
      <IconBadge
        text={coffeeGrind}
        icon={TbColorFilter}
        color='orange.600'
        tooltip={'Grind'}
      />
      <IconBadge
        text={waterWeight + 'g'}
        icon={TbDroplet}
        color='blue.600'
        tooltip={'Amount of Water'}
      />
      <IconBadge
        text={waterTemp + '°'}
        icon={FaThermometerThreeQuarters}
        color='blue.600'
        tooltip={'Water Temperature'}
      />
      <IconBadge
        text={formatMinutesSeconds(brewTime)}
        icon={BiTimeFive}
        color='purple.700'
      />
    </>
  );
}
