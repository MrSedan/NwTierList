import { useDroppable } from '@dnd-kit/core';
import { useEffect } from 'react';

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
  const getColorCode = (color: string) => {
    let color_code = '';
    // TODO: color on hover
    switch (color) {
      case 'green':
        color_code = isOver ? '#55efc4' : '#00b894';
        break;
      case 'red':
        color_code = isOver ? '#d63031' : '#ff7675';
        break;
      case 'yellow':
        color_code = isOver ? '#fdcb6e' : '#ffeaa7';
        break;
      default:
        color_code = color;
    }
    return color_code;
  };
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

  useEffect(() => {
    console.log(isOver);
  }, [isOver]);

  const style = {
    backgroundColor: getColorCode(color),
    color: getTextColorCode(textColor),
  };

  return (
    <div
      className={`w-32 h-32 flex justify-center items-center font-bold text-2xl rounded-lg`}
      style={style}
      key={name}
      ref={setNodeRef}
    >
      {name}
    </div>
  );
};
