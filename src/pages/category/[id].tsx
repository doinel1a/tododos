import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import AddForm from '@/components/form/add-form';
import Layout from '@/components/layout/layout';
import TasksList from '@/components/task/tasks-list';
import useCategoriesList from '@/hooks/use-categories-list';
import { ICategory } from '@/types/category';
import { createDeepCopy } from '@/utils/json';

export default function TodoList() {
  const router = useRouter();

  const { categoriesList, setCategoriesList } = useCategoriesList();

  const [taskName, setTaskName] = useState('');
  const [taskList, setTaskList] = useState<ICategory>();

  useEffect(() => {
    const { id } = router.query;

    const taskList = categoriesList.find(
      (list) => list.name.toLowerCase().replaceAll(' ', '-') === id
    );

    setTaskList(taskList);
  }, [router, categoriesList]);

  const addTask = (event: React.FormEvent) => {
    event.preventDefault();

    if (taskName.trim() !== '' && taskList !== undefined) {
      const temporaryCategoriesList = createDeepCopy(categoriesList);

      temporaryCategoriesList
        .find((category) => category.id === taskList.id)
        ?.tasks?.unshift({
          id: uuid(),
          task: taskName,
          createdAt: new Date().toLocaleString(),
          completedAt: '',
          isDone: false
        });

      setCategoriesList(temporaryCategoriesList);
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
        categoriesListLength={taskList.tasks.length}
        onInputChange={(event) => setTaskName(event.target.value)}
        onInputClear={() => setTaskName('')}
        onFormSubmit={addTask}
      />
      <TasksList list={taskList} />
    </Layout>
  );
}
