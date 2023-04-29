import React from 'react';

import useCategoriesList from '../../hooks/use-categories-list';
import { createDeepCopy } from '../../utils/json';
import CategoriesListItem from './list-item';

export default function CategoriesList() {
  const { categoriesList, setCategoriesList } = useCategoriesList();

  const onUpdate = (categoryId: string, updatedName: string) => {
    const temporaryCategoriesList = createDeepCopy(categoriesList);

    temporaryCategoriesList.map((category) => {
      if (category.id === categoryId) category.name = updatedName;
    });

    setCategoriesList(temporaryCategoriesList);
  };

  const onDelete = (categoryId: string) => {
    const temporaryCategoriesList = createDeepCopy(categoriesList);

    setCategoriesList(
      temporaryCategoriesList.filter((category) => category.id !== categoryId)
    );
  };

  return (
    <ul
      className={`h-full overflow-y-auto ${
        categoriesList.length > 0 ? 'rounded-b-lg border border-tertiary' : ''
      }`}
    >
      {categoriesList.map((category) => (
        <CategoriesListItem
          key={category.id}
          category={category}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
