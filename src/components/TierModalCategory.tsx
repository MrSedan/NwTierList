import { useDroppable } from '@dnd-kit/core';
import { darkenRgbColor } from '../tools/colors';

interface TierModalCategoryProps {
  color: string;
  textColor: string;
  name: string;
}

export const TierModalCategory = ({ color, textColor, name }: TierModalCategoryProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'droppable:' + name,
    data: { name },
  });
  const darkRGB = darkenRgbColor(color, 40);

  const getTextColorCode = (textColor: string) => {
    let text_color_code = '';
    switch (textColor) {
      case 'white':
        text_color_code = '#dfe6e9';
        break;
      case 'black':
        text_color_code = '#2d3436';
        break;
      default:
        text_color_code = textColor;
    }
    return text_color_code;
  };

  const style = {
    backgroundColor: isOver ? darkRGB : color,
    color: getTextColorCode(textColor),
  };

  return (
    <div
      className={`md:w-32 md:min-h-32 w-16 min-h-16 flex justify-center items-center font-bold text-sm md:text-xl rounded-lg text-center`}
      style={style}
      key={name}
      ref={setNodeRef}
    >
      {name}
    </div>
  );
};
