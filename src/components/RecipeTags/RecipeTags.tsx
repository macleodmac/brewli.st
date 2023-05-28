import { FaRegClock, FaThermometerThreeQuarters } from 'react-icons/fa';
import { TbColorFilter, TbDroplet, TbFlame, TbWeight } from 'react-icons/tb';
import { IconBadge } from '../IconBadge/IconBadge';
import { formatMinutesSeconds } from '../RecipeStep/RecipeStep';

interface RecipeTagsProps {
  brewTime: number;
  coffeeWeight: number;
  coffeeGrind: string;
  coffeeRoast: string;
  waterWeight: number;
  waterTemp: number;
}

function toTitleCase(input: string): string {
  return input
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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
      <IconBadge text={coffeeWeight + 'g'} icon={TbWeight} color="orange.600" />
      <IconBadge text={coffeeRoast} icon={TbFlame} color="orange.600" />
      <IconBadge text={coffeeGrind} icon={TbColorFilter} color="orange.600" />
      <IconBadge text={waterWeight + 'g'} icon={TbDroplet} color="blue.600" />
      <IconBadge text={waterTemp + '°'} icon={FaThermometerThreeQuarters} color="blue.600" />
      <IconBadge text={formatMinutesSeconds(brewTime)} icon={FaRegClock} color="purple.700" />
    </>
  );
}
