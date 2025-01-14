import EditIcon from '@mui/icons-material/Edit';
import { useShallow } from 'zustand/shallow';
import useStore from '../store';
import { TierImage } from './Image';
import './Tier.scss';

export interface TierProps {
  color: string;
  name: string;
  textColor: string;
  id?: string;
}
export const Tier = ({ color, name, textColor, id }: TierProps) => {
  let color_code = '';
  let text_color_code = '';
  const [tierImages, setEditingTierLevel] = useStore(useShallow(state => [state.images, state.setEditingTierLevel]));
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
      color_code = color;
  }
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

  return (
    <>
      <div className='w-full min-h-40 bg-[#2d3436] h-auto flex flex-row'>
        <div
          className='w-24 min-h-40 flex items-center justify-center relative tier_name text-center text-xs'
          style={{
            color: text_color_code,
            backgroundColor: color_code,
          }}
        >
          <button
            className='absolute right-[5%] top-[5%] opacity-0 transition duration-250 ease-in-out'
            onClick={() => {
              setEditingTierLevel({ name, color, textColor, id });
            }}
          >
            <EditIcon />
          </button>
          <p>{name}</p>
        </div>
        <div className='image-container flex flex-row flex-wrap justify-start w-full h-auto gap-1'>
          {tierImages
            .filter(image => image.category === name)
            .map((image, index) => (
              <TierImage image={image} key={index} />
            ))}
        </div>
      </div>
      <hr />
    </>
  );
};
