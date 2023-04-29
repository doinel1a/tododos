import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import CategoriesList from '@/components/categories/list';
import AddForm from '@/components/form/add-form';
import Layout from '@/components/layout/layout';
import useCategoriesList from '@/hooks/use-categories-list';

export default function Home() {
  const { categoriesList, setCategoriesList } = useCategoriesList();

  const [isClient, setIsClient] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  function addCategory(event: React.FormEvent) {
    event.preventDefault();

    if (categoryName.trim() !== '') {
      setCategoriesList([
        {
          id: uuid(),
          name: categoryName,
          tasks: [],
          createdAt: new Date().toLocaleString(),
          updatedAt: ''
        },
        ...categoriesList
      ]);

      setCategoryName('');
    }
  }

  return isClient ? (
    <Layout>
      <AddForm
        inputValue={categoryName}
        categoriesListLength={categoriesList.length}
        onInputChange={(event) => setCategoryName(event.target.value)}
        onInputClear={() => setCategoryName('')}
        onFormSubmit={addCategory}
      />
      <CategoriesList />
    </Layout>
  ) : (
    <></>
  );
}
