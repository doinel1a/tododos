import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import useLists from '../../hooks/use-lists';
import useUserAgent from '../../hooks/use-user-agent';
import Form from '../form/form';
import Input from '../form/input';

export default function AddList() {
  const { isMobile } = useUserAgent();
  const { lists, setLists } = useLists();
  const [listName, setListName] = useState('');

  const addList = (event: React.FormEvent) => {
    event.preventDefault();

    if (listName.trim() !== '') {
      setLists([
        {
          id: uuid(),
          name: listName,
          tasks: [],
          createdAt: new Date().toLocaleString(),
          updatedAt: ''
        },
        ...lists
      ]);
    }

    setListName('');
  };

  return (
    <Form
      CSS={`border border-tertiary ${
        lists?.length > 0 ? ' rounded-t-lg' : 'rounded-lg'
      }`}
      onSubmit={(event) => addList(event)}
    >
      <Input
        value={listName}
        placeholder='What needs to be handled?'
        CSS='p-3 md:p-4'
        shouldAutofocus={isMobile ? false : true}
        shouldClear={true}
        onChange={(event) => setListName(event.target.value)}
        onClear={() => setListName('')}
      />
    </Form>
  );
}
