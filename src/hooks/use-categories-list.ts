import { useEffect } from 'react';

import { CATEGORIES_LIST_KEY } from '@/config/consts';
import setCategoriesList from '@/slices/categories-list-slice';
import { ICategory } from '@/types/category';
import { setToStorage } from '@/utils/local-storage';

import { useAppDispatch, useAppSelector } from './use-redux';

export default function useCategoriesList() {
  const categoriesList = useAppSelector((state) => state.categoriesList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setToStorage(CATEGORIES_LIST_KEY, categoriesList);
  }, [categoriesList]);

  return {
    categoriesList,
    setCategoriesList: (categoriesList: ICategory[]) =>
      dispatch(setCategoriesList(categoriesList))
  };
}
