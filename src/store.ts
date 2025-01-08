import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface tierImage {
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
    changeTierImage: (state, action: PayloadAction<tierImage>) => {
      return state.map(image => {
        if (image.name == action.payload.name) return action.payload;
        return image;
      });
    },
  },
});

export const { addTierImage, removeTierImage, changeTierImage } = tierImages.actions;

const store = configureStore({
  reducer: {
    tierImages: tierImages.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
