import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import useLists from '../../hooks/use-lists';
import useUserAgent from '../../hooks/use-user-agent';
import { IList } from '../../types/list';
import { createDeepCopy } from '../../utils/json';
import Form from '../form/form';
import Input from '../form/input';

// eslint-disable-next-line unicorn/prevent-abbreviations
interface IAddTask {
  list: IList;
}

export default function AddTask({ list }: IAddTask) {
  const { isMobile } = useUserAgent();
  const { lists, setLists } = useLists();
  const [task, setTask] = useState('');

  const addTask = (event: React.FormEvent) => {
    event.preventDefault();

    if (task.trim() !== '') {
      const temporaryLists = createDeepCopy(lists);

      temporaryLists
        .find((temporaryList) => temporaryList.id === list.id)
        ?.tasks?.unshift({
          id: uuid(),
          task: task,
          createdAt: new Date().toLocaleString(),
          completedAt: '',
          isDone: false
        });

      setLists(temporaryLists);
    }

    setTask('');
  };

  return (
    <Form
      id='add'
      CSS={`border border-tertiary ${
        list.tasks.length > 0 ? ' rounded-t-lg' : 'rounded-lg'
      }`}
      onSubmit={(event) => addTask(event)}
    >
      <Input
        value={task}
        placeholder='What needs to be done?'
        CSS='p-3 md:p-4'
        shouldAutofocus={isMobile ? false : true}
        shouldClear={true}
        onChange={(event) => setTask(event.target.value)}
        onClear={() => setTask('')}
      />
    </Form>
  );
}
