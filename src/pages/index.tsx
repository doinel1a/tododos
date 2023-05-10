import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import CategoriesList from '@/components/categories/list';
import AddForm from '@/components/form/add-form';
import Layout from '@/components/layout/layout';
import useCategoriesList from '@/hooks/use-categories-list';
import { api } from '@/utils/api';

export default function Home() {
  const { data: sessionData } = useSession();

  const { categoriesList, setCategoriesList } = useCategoriesList();

  const [isClient, setIsClient] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const { data: publicTest } = api.test.getPublicTest.useQuery();
  const { data: authenticatedTest } = api.test.getAuthenticatedTest.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined
    }
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log(publicTest);
  }, [publicTest]);

  useEffect(() => {
    console.log(authenticatedTest);
  }, [authenticatedTest]);

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
