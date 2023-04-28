import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import AddTask from '@/components/task/add-task';
import TasksList from '@/components/task/tasks-list';
import useLists from '@/hooks/use-lists';
import { IList } from '@/types/list';

export default function TodoList() {
  const router = useRouter();

  const { lists } = useLists();

  const [taskList, setTaskList] = useState<IList>();

  useEffect(() => {
    const { id } = router.query;

    const taskList = lists.find(
      (list) => list.name.toLowerCase().replaceAll(' ', '-') === id
    );

    setTaskList(taskList);
  }, [router, lists]);

  return taskList === undefined ? (
    <div>Loading . . .</div>
  ) : (
    <main className='flex max-h-full w-full max-w-xl flex-col justify-center overflow-hidden rounded-lg bg-secondary p-2 md:p-4'>
      <nav className='relative mb-4 flex w-full items-center justify-start '>
        <Link href='/' title='Back' className='absolute'>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className='text-lg text-color-primary transition-colors hover:text-color-secondary'
          />
        </Link>
        <h2 className='w-full text-center text-2xl font-bold'>
          {taskList.name}
        </h2>
      </nav>

      <AddTask list={taskList} />
      <TasksList list={taskList} />
    </main>
  );
}
