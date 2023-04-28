import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import AddForm from '@/components/form/add-form';
import Layout from '@/components/layout/layout';
import TasksList from '@/components/task/tasks-list';
import useLists from '@/hooks/use-lists';
import { IList } from '@/types/list';
import { createDeepCopy } from '@/utils/json';

export default function TodoList() {
  const router = useRouter();

  const { lists, setLists } = useLists();

  const [taskName, setTaskName] = useState('');
  const [taskList, setTaskList] = useState<IList>();

  useEffect(() => {
    const { id } = router.query;

    const taskList = lists.find(
      (list) => list.name.toLowerCase().replaceAll(' ', '-') === id
    );

    setTaskList(taskList);
  }, [router, lists]);

  const addTask = (event: React.FormEvent) => {
    event.preventDefault();

    if (taskName.trim() !== '' && taskList !== undefined) {
      const temporaryCategoryList = createDeepCopy(lists);

      temporaryCategoryList
        .find((temporaryList) => temporaryList.id === taskList.id)
        ?.tasks?.unshift({
          id: uuid(),
          task: taskName,
          createdAt: new Date().toLocaleString(),
          completedAt: '',
          isDone: false
        });

      setLists(temporaryCategoryList);
      setTaskName('');
    }
  };

  return taskList === undefined ? (
    <div>Loading . . .</div>
  ) : (
    <Layout>
      <nav className='relative mb-4 flex w-full items-center justify-start '>
        <Link href='/' title='Back' className='absolute'>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className='h-5 w-5 text-lg text-color-primary transition-colors hover:text-color-secondary'
          />
        </Link>
        <h2 className='w-full text-center text-2xl font-bold'>
          {taskList.name}
        </h2>
      </nav>

      <AddForm
        inputValue={taskName}
        categoryListLength={taskList.tasks.length}
        onInputChange={(event) => setTaskName(event.target.value)}
        onInputClear={() => setTaskName('')}
        onFormSubmit={addTask}
      />
      <TasksList list={taskList} />
    </Layout>
  );
}
