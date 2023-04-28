import React, { useEffect, useState } from 'react';

import useTasksCount from '@/hooks/use-tasks-count';
import { IList } from '@/types/list';

import useLists from '../../hooks/use-lists';
import { createDeepCopy } from '../../utils/json';
import ListFooter from './list-footer';
import TaskItem from './task-item';

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ITaskList {
  list: IList;
}

const roundedLG = 'rounded-lg';
const roundedTopLG = 'rounded-t-lg';

export default function TasksList({ list }: ITaskList) {
  const { lists, setLists } = useLists();
  const { totalTasks, activeTasks, completedTasks } = useTasksCount(list.tasks);

  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState(
    createDeepCopy(list.tasks)
  );

  useEffect(() => {
    setActiveFilter('All');
    setFilteredTasks(createDeepCopy(list.tasks));
  }, [list.tasks]);

  const onChecked = (taskId: string) => {
    const now = new Date().toLocaleString();
    const temporaryLists = createDeepCopy(lists);

    for (const temporaryList of temporaryLists) {
      if (temporaryList.id === list.id) {
        temporaryList.updatedAt = now;

        for (const temporaryTask of temporaryList.tasks) {
          if (temporaryTask.id === taskId) {
            temporaryTask.isDone = !temporaryTask.isDone;
            temporaryTask.completedAt = temporaryTask.isDone ? now : '';
          }
        }
      }
    }

    setLists(temporaryLists);
  };

  const onUpdate = (taskId: string, updatedTask: string) => {
    const now = new Date().toLocaleString();
    const temporaryLists = createDeepCopy(lists);

    for (const temporaryList of temporaryLists) {
      if (temporaryList.id === list.id) {
        temporaryList.updatedAt = now;

        for (const temporaryTask of temporaryList.tasks) {
          if (temporaryTask.id === taskId) {
            temporaryTask.task = updatedTask;
          }
        }
      }
    }

    setLists(temporaryLists);
  };

  const onDelete = (taskId: string) => {
    const now = new Date().toLocaleString();
    const temporaryLists = createDeepCopy(lists);

    for (const temporaryList of temporaryLists) {
      if (temporaryList.id === list.id) {
        temporaryList.updatedAt = now;

        temporaryList.tasks = temporaryList.tasks.filter(
          (temporaryTodo) => temporaryTodo.id !== taskId
        );
      }
    }

    setLists(temporaryLists);
  };

  const onClearCompleted = () => {
    const now = new Date().toLocaleString();
    const temporaryLists = createDeepCopy(lists);

    for (const temporaryList of temporaryLists) {
      if (temporaryList.id === list.id) {
        temporaryList.updatedAt = now;

        temporaryList.tasks = temporaryList.tasks.filter(
          (temporaryTodo) => !temporaryTodo.isDone
        );
      }
    }

    setLists(temporaryLists);
  };

  const onFilter = (filter: string) => {
    const addTodoForm = document.querySelector('#add');

    switch (filter) {
      case 'all': {
        if (totalTasks > 0) {
          addTodoForm?.classList.remove(roundedLG);
          addTodoForm?.classList.add(roundedTopLG);
        } else {
          addTodoForm?.classList.remove(roundedTopLG);
          addTodoForm?.classList.add(roundedLG);
        }

        setFilteredTasks(list.tasks);

        break;
      }
      case 'active': {
        if (activeTasks === 0) {
          addTodoForm?.classList.remove(roundedTopLG);
          addTodoForm?.classList.add(roundedLG);
        } else {
          addTodoForm?.classList.remove(roundedLG);
          addTodoForm?.classList.add(roundedTopLG);
        }

        setFilteredTasks(list.tasks.filter((task) => !task.isDone));

        break;
      }
      case 'completed': {
        if (completedTasks === 0) {
          addTodoForm?.classList.remove(roundedTopLG);
          addTodoForm?.classList.add(roundedLG);
        } else {
          addTodoForm?.classList.remove(roundedLG);
          addTodoForm?.classList.add(roundedTopLG);
        }

        setFilteredTasks(list.tasks.filter((task) => task.isDone));

        break;
      }
    }
  };

  if (totalTasks > 0) {
    return (
      <>
        <ul
          className={`h-full w-full overflow-y-auto overflow-x-hidden rounded-b-lg ${
            filteredTasks?.length > 0 ? 'border border-tertiary' : ''
          }`}
        >
          {filteredTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onChecked={onChecked}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
        <ListFooter
          tasks={list.tasks}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onFilter={onFilter}
          onClearCompleted={onClearCompleted}
        />
      </>
    );
  }

  return <></>;
}
