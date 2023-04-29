import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { CATEGORIES_LIST_KEY } from '../config/consts';
import { ICategory } from '../types/category';
import { existsInStorage, getFromStorage } from '../utils/local-storage';

const initialState = (): ICategory[] => {
  return existsInStorage(CATEGORIES_LIST_KEY)
    ? (getFromStorage(CATEGORIES_LIST_KEY) as ICategory[])
    : ([] as ICategory[]);
};

const categoriesListSlice = createSlice({
  name: 'categoriesList',
  initialState,
  reducers: {
    setCategoriesList(state, { payload }: PayloadAction<ICategory[]>) {
      return payload;
    }
  }
});

const { setCategoriesList } = categoriesListSlice.actions;

export default setCategoriesList;
export { categoriesListSlice };
