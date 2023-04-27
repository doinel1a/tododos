import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { LISTS_KEY } from '../config/consts';
import { IList } from '../types/list';
import { existsInStorage, getFromStorage } from '../utils/local-storage';

const initialState = (): IList[] => {
  return existsInStorage(LISTS_KEY)
    ? (getFromStorage(LISTS_KEY) as IList[])
    : ([] as IList[]);
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists(state, { payload }: PayloadAction<IList[]>) {
      return payload;
    }
  }
});

const { setLists } = listsSlice.actions;

export default setLists;
export { listsSlice };
