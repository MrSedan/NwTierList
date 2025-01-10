import { useDraggable } from '@dnd-kit/core';
import { useEffect } from 'react';
import { tierImage } from '../dto/tier';
import useStore from '../store';
import './Image.scss';
interface ImageProps {
  image: tierImage;
}

export const TierImage = ({ image }: ImageProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable:${image.name}`,
    data: { image },
  });
  const setModalOpen = useStore(state => state.setTierLevelModalOpen);
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 99999,
      }
    : undefined;
  useEffect(() => {
    setModalOpen(isDragging);
  }, [isDragging, setModalOpen]);
  return (
    <div
      className='flex flex-wrap justify-center gap-4 mr-1 anime-container'
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
    >
      <div className={`w-[calc(10rem*.5625)] h-40 relative`}>
        <img src={image.url} alt={image.name} className='h-full w-full object-cover' />
        <div className='w-full bg-slate-500 text-white bg-opacity-70 left-0 top-0 absolute h-full flex justify-center items-center opacity-0 anime-name overflow-hidden p-1 text-center transition duration-500 ease-in-out'>
          {image.name.length > 30 ? image.name.slice(0, 30) + '...' : image.name}
        </div>
      </div>
    </div>
  );
};
