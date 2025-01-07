export interface TierProps {
  color: 'red' | 'yellow' | 'green';
  name: string;
  textColor: 'white' | 'black';
}
export const Tier = ({ color, name, textColor }: TierProps) => {
  let color_code = '';
  let text_color_code = '';
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
    <div className='w-full min-h-64 bg-[#2d3436] relative h-auto'>
      <div
        className='w-52 h-80 flex items-center justify-center'
        style={{
          color: text_color_code,
          backgroundColor: color_code,
        }}
      >
        <p className=''>{name}</p>
      </div>
      <hr />
    </div>
  );
};
