import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface tierImage {
  name: string;
  url: string;
  category: string;
}

interface tierStore {
  images: tierImage[];
  addTierImage: (image: tierImage) => void;
  editTierImage: (image: tierImage, tier: string) => void;
  removeTierImage: (image: tierImage) => void;
}

const useStore = create(
  devtools<tierStore>(
    set => ({
      images: [] as tierImage[],
      addTierImage: (image: tierImage) => set(state => ({ images: [...state.images, image] })),
      editTierImage: (image: tierImage, tier: string) =>
        set(state => ({ images: state.images.map(i => (i.name === image.name ? { ...i, category: tier } : i)) })),
      removeTierImage: (image: tierImage) => {
        URL.revokeObjectURL(image.url);
        set(state => ({ images: state.images.filter(i => i.name !== image.name) }));
      },
    }),
    { name: 'tierStore' },
  ),
);

export default useStore;
