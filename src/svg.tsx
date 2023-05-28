interface CoffeeIconProps {
  color: string;
  iconName: string;
}

const CoffeeIcon = ({ color, iconName }: CoffeeIconProps) => {
  let updatedSvg = '';

  try {
    updatedSvg = require(`../public/icons/barista-icons_${iconName}.svg`);
    console.log(updatedSvg);
    updatedSvg = updatedSvg.replace(/fill="#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})"/g, `fill="${color}"`);
  } catch (error) {
    console.error(`Failed to load SVG file: ${iconName}`, error);
  }
  return <img height={200} src={updatedSvg} style={{ margin: '0 30px' }} width={232} />;
};

export default CoffeeIcon;
