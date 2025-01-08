import { useAppSelector } from '../hooks';
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
  return (
    <>
      <div className='w-full min-h-64 bg-[#2d3436] h-auto flex flex-row'>
        <div
          className='w-52 h-80 flex items-center justify-center'
          style={{
            color: text_color_code,
            backgroundColor: color_code,
          }}
        >
          <p>{name}</p>
        </div>
        <div className='image-container flex flex-row gap-1'>
          {tierImages
            .filter(image => image.category === name)
            .map((image, index) => (
              <TierImage image={image.url} name={image.name} key={index} />
            ))}
        </div>
      </div>
      <hr />
    </>
  );
};
