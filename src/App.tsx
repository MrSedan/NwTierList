import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import './App.scss';
import { EditTierModal } from './components/EditTierModal';
import { TierImage } from './components/Image';
import { Tier } from './components/Tier';
import { TierModal } from './components/TierModal';
import { tierImage } from './dto/tier';
import useStore from './store';

const App = () => {
  const [images, addTierImage, tierLevels, editTierImage] = useStore(
    useShallow(state => [state.images, state.addTierImage, state.tierLevels, state.editTierImage]),
  );

  const uploadBtn = useRef<HTMLInputElement>(null);

  const clickUpload = () => {
    if (uploadBtn.current) uploadBtn.current.click();
  };

  const handleAdd = (images: tierImage[]) => {
    images.forEach(image => {
      addTierImage(image);
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.data.current && over && over.data.current) {
      const image: tierImage = active.data.current.image;
      editTierImage(image, over.data.current.name);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex flex-col w-full'>
        {tierLevels.map(tier_level => (
          <Tier
            color={tier_level.color}
            textColor={tier_level.textColor}
            name={tier_level.name}
            id={tier_level.id}
            key={tier_level.id ?? tier_level.name}
          />
        ))}
      </div>
      <div className='flex flex-row w-full gap-1 p-5 flex-wrap'>
        {images
          .filter(image => image.category === '')
          .map((image, index) => (
            <TierImage image={image} key={index} />
          ))}
      </div>
      <div className='border border-black w-20 text-center cursor-pointer' onClick={clickUpload}>
        <span>Upload</span>
        <input
          type='file'
          name='imageUpload'
          accept='.jpeg'
          ref={uploadBtn}
          multiple
          style={{ display: 'none' }}
          onChange={event => {
            console.log(event.target.files);
            if (event.target.files) {
              const upload_images: tierImage[] = [];
              for (let i = 0; i < event.target.files.length; i++) {
                const url = URL.createObjectURL(event.target.files[i]);
                upload_images.push({
                  url: url,
                  name: event.target.files[i].name.replace('.jpeg', ''),
                  category: '',
                });
              }
              handleAdd(upload_images);
            }
          }}
        />
      </div>
      <TierModal />
      <EditTierModal />
    </DndContext>
  );
};

export default App;
