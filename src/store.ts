import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TierProps } from './components/Tier';
import { tierImage } from './dto/tier';
import { generateTierLevel } from './tools/genarators';

const defaultTierLevels: TierProps[] = [
  generateTierLevel('S', 'rgb(255, 127, 127)', 'black'),
  generateTierLevel('A', 'rgb(255, 191, 127)', 'black'),
  generateTierLevel('B', 'rgb(255, 223, 127)', 'black'),
  generateTierLevel('C', 'rgb(255, 255, 127)', 'black'),
  generateTierLevel('D', 'rgb(191, 255, 127)', 'black'),
  generateTierLevel('E', 'rgb(127, 255, 127)', 'black'),
  generateTierLevel('F', 'rgb(127, 255, 255)', 'black'),
  generateTierLevel("Haven't watched yet", 'rgb(127, 191, 255)', 'black'),
];

interface tierStore {
  images: tierImage[];
  addTierImage: (image: tierImage) => void;
  editTierImage: (image: tierImage, tier: string) => void;
  removeTierImage: (image: tierImage) => void;
  tierLevelsModalOpen: boolean;
  setTierLevelModalOpen: (open: boolean) => void;
  tierLevels: TierProps[];
  addTierLevel: (name: string, color: string, textColor: string) => void;
  editTierLevelName: (id: string, name: string) => void;
  editingTierLevel: TierProps | null;
  setEditingTierLevel: (level: TierProps | null) => void;
}

const useStore = create(
  devtools<tierStore>(
    set => ({
      images: [] as tierImage[],
      addTierImage: (image: tierImage) => set(state => ({ images: [...state.images, image] })),
      editTierImage: (image: tierImage, tier: string) =>
        set(state => ({
          images:
            image.category === tier
              ? state.images
              : state.images.map(i => (i.name === image.name ? { ...i, category: tier } : i)),
        })),
      removeTierImage: (image: tierImage) => {
        URL.revokeObjectURL(image.url);
        set(state => ({ images: state.images.filter(i => i.name !== image.name) }));
      },
      tierLevelsModalOpen: false,
      setTierLevelModalOpen: (open: boolean) => set({ tierLevelsModalOpen: open }),
      tierLevels: defaultTierLevels,
      addTierLevel: (name: string, color: string, textColor: string) =>
        set(state => ({ tierLevels: [...state.tierLevels, generateTierLevel(name, color, textColor)] })),
      editTierLevelName: (id: string, name: string) =>
        set(state => ({ tierLevels: state.tierLevels.map(t => (t.id === id ? { ...t, name } : t)) })),
      editingTierLevel: null,
      setEditingTierLevel: (level: TierProps | null) => set({ editingTierLevel: level }),
    }),
    { name: 'tierStore' },
  ),
);

export default useStore;
