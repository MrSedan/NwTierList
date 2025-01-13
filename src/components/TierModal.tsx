import { useShallow } from 'zustand/shallow';
import useStore from '../store';
import { TierModalCategory } from './TierModalCategory';

export const TierModal = () => {
  const [modalOpen, tierLevels] = useStore(useShallow(state => [state.tierLevelsModalOpen, state.tierLevels]));

  return (
    <div
      className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${
        modalOpen ? 'flex' : 'hidden'
      } min-w-[300px] md:w-[70vw] md:h-1/4 h-[90vh] bg-[#2d3436] ps-8 pe-8 pt-8 pb-8 z-50 rounded-3xl flex-col md:flex-row gap-4 justify-center items-center text-white border-white border-2`}
    >
      {tierLevels.map(tier_level => (
        <TierModalCategory name={tier_level.name} color={tier_level.color} textColor={tier_level.textColor} />
      ))}
    </div>
  );
};
