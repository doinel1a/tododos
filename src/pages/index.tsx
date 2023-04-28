import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import AddForm from '@/components/form/add-form';
import Layout from '@/components/layout/layout';
import Lists from '@/components/list/lists';
import useLists from '@/hooks/use-lists';

export default function Home() {
  const { lists, setLists } = useLists();

  const [isClient, setIsClient] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  function addCategory(event: React.FormEvent) {
    event.preventDefault();

    if (categoryName.trim() !== '') {
      setLists([
        {
          id: uuid(),
          name: categoryName,
          tasks: [],
          createdAt: new Date().toLocaleString(),
          updatedAt: ''
        },
        ...lists
      ]);

      setCategoryName('');
    }
  }

  return isClient ? (
    <Layout>
      <AddForm
        inputValue={categoryName}
        categoryListLength={lists.length}
        onInputChange={(event) => setCategoryName(event.target.value)}
        onInputClear={() => setCategoryName('')}
        onFormSubmit={addCategory}
      />
      <Lists />
    </Layout>
  ) : (
    <></>
  );
}
