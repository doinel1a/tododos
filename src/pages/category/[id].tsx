import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import AddForm from '@/components/form/add-form';
import Layout from '@/components/layout/layout';
import TasksList from '@/components/tasks/list';
import useCategoriesList from '@/hooks/use-categories-list';
import { ICategory } from '@/types/category';
import { createDeepCopy } from '@/utils/json';
import { createQueryFromCategoryName } from '@/utils/url';

export default function TasksListPage() {
  const router = useRouter();

  const { categoriesList, setCategoriesList } = useCategoriesList();

  const [taskName, setTaskName] = useState('');
  const [category, setTaskList] = useState<ICategory>();

  useEffect(() => {
    const { id } = router.query;

    const taskList = categoriesList.find(
      (list) => createQueryFromCategoryName(list.name) === id
    );

    setTaskList(taskList);
  }, [router, categoriesList]);

  const addTask = (event: React.FormEvent) => {
    event.preventDefault();

    if (taskName.trim() !== '' && category !== undefined) {
      const temporaryCategoriesList = createDeepCopy(categoriesList);

      temporaryCategoriesList
        .find((temporaryCategory) => temporaryCategory.id === category.id)
        ?.tasks?.unshift({
          id: uuid(),
          task: taskName,
          createdAt: new Date().toLocaleString(),
          completedAt: '',
          isCompleted: false
        });

      setCategoriesList(temporaryCategoriesList);
      setTaskName('');
    }
  };

  return category === undefined ? (
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
          {category.name}
        </h2>
      </nav>

      <AddForm
        inputValue={taskName}
        categoriesListLength={category.tasks.length}
        onInputChange={(event) => setTaskName(event.target.value)}
        onInputClear={() => setTaskName('')}
        onFormSubmit={addTask}
      />
      <TasksList categoryId={category.id} tasksList={category.tasks} />
    </Layout>
  );
}
