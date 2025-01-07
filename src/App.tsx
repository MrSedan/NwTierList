import { useEffect, useRef, useState } from 'react';
import './App.css';
import { TierImage } from './components/Image';
import { Tier, TierProps } from './components/Tier';

const default_tier_levels: TierProps[] = [
  {
    name: 'S',
    color: 'green',
    textColor: 'black',
  },
  {
    name: 'A',
    color: 'yellow',
    textColor: 'black',
  },
  {
    name: 'B',
    color: 'red',
    textColor: 'black',
  },
];

function App() {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    console.log(images);
  }, [images]);
  const uploadBtn = useRef<HTMLInputElement>(null);

  const clickUpload = () => {
    if (uploadBtn.current) uploadBtn.current.click();
  };

  return (
    <>
      <div className='flex flex-col w-full'>
        {default_tier_levels.map(tier_level => (
          <Tier
            color={tier_level.color}
            textColor={tier_level.textColor}
            name={tier_level.name}
            key={tier_level.name}
          />
        ))}
      </div>
      <div className='flex flex-row w-full'>
        {images.map((image, index) => (
          <TierImage image={image} name='test' key={index} />
        ))}
      </div>
      <div className='border border-black w-20 text-center cursor-pointer' onClick={clickUpload}>
        <span>Upload</span>
        <input
          type='file'
          name='imageUpload'
          accept='.jpeg'
          ref={uploadBtn}
          style={{ display: 'none' }}
          onChange={event => {
            console.log(event.target.files);
            if (event.target.files) {
              const upload_images: string[] = [];
              for (let i = 0; i < event.target.files.length; i++) {
                const url = URL.createObjectURL(event.target.files[i]);
                upload_images.push(url);
              }
              setImages(prev => [...prev, ...upload_images]);
            }
          }}
        />
      </div>
    </>
  );
}

export default App;
