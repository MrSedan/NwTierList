import { tierImage } from '../store';
interface ImageProps {
  image: tierImage;
  onDragStart?: () => void;
}

export const TierImage = ({ image, onDragStart }: ImageProps) => {
  return (
    <div
      className='flex flex-wrap justify-center gap-4 mr-1'
      onDragStart={() => {
        // e.preventDefault();
        if (onDragStart) onDragStart();
      }}
    >
      <div className={`w-[calc(20rem*.5625)] h-80 relative`}>
        <img src={image.url} alt={image.name} className='h-full w-full object-cover' />
        <div className='w-full bg-slate-500 text-white bg-opacity-70 text-center bottom-0 left-0 absolute'>
          {image.name}
        </div>
      </div>
    </div>
  );
};
