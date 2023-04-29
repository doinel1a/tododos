import React, { useEffect, useState } from 'react';

import useTasksCount from '@/hooks/use-tasks-count';
import { ICategory } from '@/types/category';

import useCategoriesList from '../../hooks/use-categories-list';
import { createDeepCopy } from '../../utils/json';
import ListFooter from './list-footer';
import TasksListItem from './list-item';

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ITaskList {
  list: ICategory;
}

const roundedLG = 'rounded-lg';
const roundedTopLG = 'rounded-t-lg';

export default function TasksList({ list }: ITaskList) {
  const { categoriesList, setCategoriesList } = useCategoriesList();
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
    const temporaryCategoriesList = createDeepCopy(categoriesList);

    for (const category of temporaryCategoriesList) {
      if (category.id === list.id) {
        category.updatedAt = now;

        for (const temporaryTask of category.tasks) {
          if (temporaryTask.id === taskId) {
            temporaryTask.isDone = !temporaryTask.isDone;
            temporaryTask.completedAt = temporaryTask.isDone ? now : '';
          }
        }
      }
    }

    setCategoriesList(temporaryCategoriesList);
  };

  const onUpdate = (taskId: string, updatedTask: string) => {
    const now = new Date().toLocaleString();
    const temporaryCategoriesList = createDeepCopy(categoriesList);

    for (const category of temporaryCategoriesList) {
      if (category.id === list.id) {
        category.updatedAt = now;

        for (const temporaryTask of category.tasks) {
          if (temporaryTask.id === taskId) {
            temporaryTask.task = updatedTask;
          }
        }
      }
    }

    setCategoriesList(temporaryCategoriesList);
  };

  const onDelete = (taskId: string) => {
    const now = new Date().toLocaleString();
    const temporaryCategoriesList = createDeepCopy(categoriesList);

    for (const category of temporaryCategoriesList) {
      if (category.id === list.id) {
        category.updatedAt = now;

        category.tasks = category.tasks.filter((task) => task.id !== taskId);
      }
    }

    setCategoriesList(temporaryCategoriesList);
  };

  const onClearCompleted = () => {
    const now = new Date().toLocaleString();
    const temporaryCategoriesList = createDeepCopy(categoriesList);

    for (const category of temporaryCategoriesList) {
      if (category.id === list.id) {
        category.updatedAt = now;

        category.tasks = category.tasks.filter((task) => !task.isDone);
      }
    }

    setCategoriesList(temporaryCategoriesList);
  };

  const onFilter = (filter: string) => {
    const addTaskForm = document.querySelector('#add');

    switch (filter) {
      case 'all': {
        if (totalTasks > 0) {
          addTaskForm?.classList.remove(roundedLG);
          addTaskForm?.classList.add(roundedTopLG);
        } else {
          addTaskForm?.classList.remove(roundedTopLG);
          addTaskForm?.classList.add(roundedLG);
        }

        setFilteredTasks(list.tasks);

        break;
      }
      case 'active': {
        if (activeTasks === 0) {
          addTaskForm?.classList.remove(roundedTopLG);
          addTaskForm?.classList.add(roundedLG);
        } else {
          addTaskForm?.classList.remove(roundedLG);
          addTaskForm?.classList.add(roundedTopLG);
        }

        setFilteredTasks(list.tasks.filter((task) => !task.isDone));

        break;
      }
      case 'completed': {
        if (completedTasks === 0) {
          addTaskForm?.classList.remove(roundedTopLG);
          addTaskForm?.classList.add(roundedLG);
        } else {
          addTaskForm?.classList.remove(roundedLG);
          addTaskForm?.classList.add(roundedTopLG);
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
            <TasksListItem
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
