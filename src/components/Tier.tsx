import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeTierImage, tierImage } from '../store';
import { TierImage } from './Image';

export interface TierProps {
  color: 'red' | 'yellow' | 'green';
  name: string;
  textColor: 'white' | 'black';
}
export const Tier = ({ color, name, textColor }: TierProps) => {
  let color_code = '';
  let text_color_code = '';
  const tierImages = useAppSelector(state => state.tierImages);
  const dispatch = useAppDispatch();
  switch (color) {
    case 'green':
      color_code = '#00b894';
      break;
    case 'red':
      color_code = '#ff7675';
      break;
    case 'yellow':
      color_code = '#ffeaa7';
      break;
    default:
      color_code = '#6c5ce7';
  }
  switch (textColor) {
    case 'white':
      text_color_code = '#dfe6e9';
      break;
    default:
      text_color_code = '#2d3436';
  }

  const [currentDragImage, setCurrentDragImage] = useState<tierImage | null>(null);
  const [currentDragTier, setCurrentDragTier] = useState<string>('');

  const onDragStart = (image: tierImage) => {
    setCurrentDragImage(image);
  };

  return (
    <>
      <div
        className='w-full min-h-40 bg-[#2d3436] h-auto flex flex-row'
        onDragEnd={() => {
          // e.preventDefault();
          if (currentDragImage) {
            if (currentDragImage.category === name) return;
            console.log(currentDragImage);
            console.log(name);
            dispatch(changeTierImage({ ...currentDragImage, category: name }));
          }
          setCurrentDragImage(null);
        }}
        onDragOver={() => {
          if (currentDragTier !== name) setCurrentDragTier(name);
        }}
      >
        <div
          className='w-24 min-h-40 flex items-center justify-center'
          style={{
            color: text_color_code,
            backgroundColor: color_code,
          }}
        >
          <p>{name}</p>
        </div>
        <div className='image-container flex flex-row flex-wrap justify-between w-full h-auto'>
          {tierImages
            .filter(image => image.category === name)
            .map((image, index) => (
              <TierImage image={image} key={index} onDragStart={() => onDragStart(image)} />
            ))}
        </div>
      </div>
      <hr />
    </>
  );
};
