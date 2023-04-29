import React, { useEffect, useState } from 'react';

import useTasksCount from '@/hooks/use-tasks-count';
import { ITask } from '@/types/task';

import useCategoriesList from '../../hooks/use-categories-list';
import { createDeepCopy } from '../../utils/json';
import ListFooter from './list-footer';
import TasksListItem from './list-item';

interface ITaskList {
  categoryId: string;
  tasksList: ITask[];
}

const roundedLG = 'rounded-lg';
const roundedTopLG = 'rounded-t-lg';

export default function TasksList({ categoryId, tasksList }: ITaskList) {
  const { categoriesList, setCategoriesList } = useCategoriesList();
  const { totalTasks, activeTasks, completedTasks } = useTasksCount(tasksList);

  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState(createDeepCopy(tasksList));

  useEffect(() => {
    setActiveFilter('All');
    setFilteredTasks(createDeepCopy(tasksList));
  }, [tasksList]);

  const onChecked = (taskId: string) => {
    const now = new Date().toLocaleString();
    const temporaryCategoriesList = createDeepCopy(categoriesList);

    for (const category of temporaryCategoriesList) {
      if (category.id === categoryId) {
        category.updatedAt = now;

        for (const task of category.tasks) {
          if (task.id === taskId) {
            task.isCompleted = !task.isCompleted;
            task.completedAt = task.isCompleted ? now : '';
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
      if (category.id === categoryId) {
        category.updatedAt = now;

        for (const task of category.tasks) {
          if (task.id === taskId) {
            task.task = updatedTask;
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
      if (category.id === categoryId) {
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
      if (category.id === categoryId) {
        category.updatedAt = now;

        category.tasks = category.tasks.filter((task) => !task.isCompleted);
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

        setFilteredTasks(tasksList);

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

        setFilteredTasks(tasksList.filter((task) => !task.isCompleted));

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

        setFilteredTasks(tasksList.filter((task) => task.isCompleted));

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
          tasks={tasksList}
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
