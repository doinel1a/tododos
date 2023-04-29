import { configureStore } from '@reduxjs/toolkit';

import { categoriesListSlice } from '@/slices/categories-list-slice';

const store = configureStore({
  reducer: {
    categoriesList: categoriesListSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
