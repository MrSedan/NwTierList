interface ImageProps {
  image: string;
  name: string;
}

export const TierImage = ({ image, name }: ImageProps) => {
  return (
    <div className='flex flex-wrap justify-center gap-4 mr-1'>
      <div className={`w-[calc(20rem*.5625)] h-80 relative`}>
        <img src={image} alt={name} className='h-full w-full object-cover' />
        <div className='w-full bg-slate-500 text-white bg-opacity-70 text-center bottom-0 left-0 absolute'>{name}</div>
      </div>
    </div>
  );
};
