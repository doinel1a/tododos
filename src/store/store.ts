import { configureStore } from '@reduxjs/toolkit';

import { listsSlice } from '@/slices/lists-slice';

const store = configureStore({
  reducer: {
    lists: listsSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
