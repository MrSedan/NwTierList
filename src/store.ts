import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface tierImage {
  name: string;
  url: string;
  category: string;
}

const tierImages = createSlice({
  name: 'images',
  initialState: [] as tierImage[],
  reducers: {
    addTierImage: (state, action: PayloadAction<tierImage>) => {
      state.push(action.payload);
    },
    removeTierImage: (state, action: PayloadAction<string>) => {
      return state.filter(image => image.name !== action.payload);
    },
  },
});

export const { addTierImage, removeTierImage } = tierImages.actions;

const store = configureStore({
  reducer: {
    tierImages: tierImages.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
