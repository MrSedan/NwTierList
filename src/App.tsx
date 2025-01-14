import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { GitHub } from '@mui/icons-material';
import html2canvas from 'html2canvas';
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

  const tierListRef = useRef<HTMLDivElement>(null);

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

  const handleDownloadImage = async () => {
    if (!tierListRef.current) return;
    const el = tierListRef.current;
    const canvas = await html2canvas(el);

    const data = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'tierlist.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div className='bg-[#2d3436] w-full h-full pb-5'>
      <div className='bg-[#2d3436] w-full h-12 flex flex-row justify-center items-center text-[#dfe6e9] text-2xl border-b-2'>
        NwTierList
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className='flex flex-col w-full' ref={tierListRef}>
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
        {images.some(image => image.category === '') && (
          <div className='flex flex-row w-full gap-1 p-5 flex-wrap'>
            {images
              .filter(image => image.category === '')
              .map((image, index) => (
                <TierImage image={image} key={index} />
              ))}
          </div>
        )}
        <TierModal />
        <EditTierModal />
      </DndContext>
      <div
        className='border border-[#dfe6e9] w-32 text-center cursor-pointer  text-[#dfe6e9] hover:text-[#2d3436] hover:bg-[#dfe6e9] 
          hover:rounded-xl hover:scale-110 active:text-[#2d3436] active:bg-[#dfe6e9] active:rounded-xl active:scale-110 rounded-lg mt-5 ms-auto me-auto 
          transition-all duration-300 ease-in-out'
        onClick={clickUpload}
      >
        <span>Add photo</span>
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
      <div
        className='border border-[#dfe6e9] w-32 text-center cursor-pointer  text-[#dfe6e9] hover:text-[#2d3436] hover:bg-[#dfe6e9] 
          hover:rounded-xl hover:scale-110 active:text-[#2d3436] active:bg-[#dfe6e9] active:rounded-xl active:scale-110 rounded-lg mt-5 ms-auto me-auto 
          transition-all duration-300 ease-in-out'
        onClick={handleDownloadImage}
      >
        <span>Export as PNG</span>
      </div>

      <div className='w-full text-[#dfe6e9] flex flex-row items-center justify-center md:justify-between mt-5 gap-1 md:pe-5 md:ps-5'>
        <span className='text-[#dfe6e9]'>Version 0.0.2</span>
        <a href='https://git.nwaifu.su/sergey/NwTierList' target='_blank'>
          Source Code <GitHub />
        </a>
      </div>
    </div>
  );
};

export default App;
