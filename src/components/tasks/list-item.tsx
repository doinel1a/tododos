/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faClose, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import useUserAgent from '../../hooks/use-user-agent';
import { ITask } from '../../types/task';
import Button from '../button';
import Form from '../form/form';
import Input from '../form/input';

interface ITaskItem {
  task: ITask;
  onChecked: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updatedTask: string) => void;
}

export default function TasksListItem({
  task,
  onChecked,
  onDelete,
  onUpdate
}: ITaskItem) {
  const { isMobile } = useUserAgent();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.task);

  useEffect(() => {
    if (isEditMode) {
      document.body.addEventListener('click', handleOutsideClicks);
    } else {
      document.body.removeEventListener('click', handleOutsideClicks);
    }

    return () => {
      document.body.removeEventListener('click', handleOutsideClicks);
    };
  }, [isEditMode]);

  function handleOutsideClicks(event: MouseEvent) {
    if ((event.target as Element).id !== 'edit-input') {
      setIsEditMode(false);
    }
  }

  const updateTask = (event: React.FormEvent) => {
    event.preventDefault();

    if (task.task !== updatedTask) {
      onUpdate(task.id, updatedTask);
    }

    setIsEditMode(false);
  };

  return (
    <li
      className='w-full border-b border-tertiary p-2 text-lg last:border-b-0 md:p-4'
      onMouseEnter={() => {
        if (!isEditMode) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isEditMode) setIsHovered(false);
      }}
    >
      {isEditMode ? (
        <div className='relative flex flex-col px-2'>
          <Form
            id='edit-form'
            onSubmit={(event) => updateTask(event)}
            CSS='flex items-center border border-transparent'
          >
            <Input
              id='edit-input'
              value={updatedTask}
              shouldAutofocus={true}
              shouldClear={false}
              onChange={(event) => setUpdatedTask(event.target.value)}
            />
            <FontAwesomeIcon
              icon={faSquarePen}
              className='absolute right-2 h-4 w-4 text-color-secondary'
            />
          </Form>
          <div className='mt-2 flex w-full cursor-default  flex-col justify-between text-xs text-color-secondary md:flex-row'>
            <span>Created: {task.createdAt}</span>
            {task.completedAt === '' ? (
              <></>
            ) : (
              <span>Completed: {task.completedAt}</span>
            )}
          </div>
        </div>
      ) : (
        <div className='relative flex flex-col px-2'>
          <div className='flex'>
            <input
              type='checkbox'
              checked={task.isCompleted}
              onChange={() => onChecked(task.id)}
            />
            <p
              title={task.isCompleted ? '' : 'Click to update task'}
              className={`ml-1 w-fit px-2 ${
                task.isCompleted
                  ? 'cursor-default border border-transparent text-color-secondary line-through'
                  : 'cursor-text rounded-lg border border-transparent hover:border-accent-primary'
              }`}
              onClick={(event) => {
                if (!task.isCompleted) {
                  event.preventDefault();
                  event.stopPropagation();

                  setIsHovered(false);
                  setIsEditMode(true);
                }
              }}
            >
              {task.task}
            </p>
          </div>
          <div className='mt-2 flex w-full cursor-default  flex-col justify-between text-xs text-color-secondary md:flex-row'>
            <span>Created: {task.createdAt}</span>
            {task.completedAt === '' ? (
              <></>
            ) : (
              <span>Completed: {task.completedAt}</span>
            )}
          </div>
          {isMobile ? (
            <Button
              type='icon'
              title='Delete task'
              icon={faClose}
              buttonCSS='absolute right-2'
              iconCSS='text-red-400 hover:text-red-600'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDelete(task.id);
              }}
            />
          ) : isHovered ? (
            <Button
              type='icon'
              title='Delete task'
              icon={faClose}
              buttonCSS='absolute right-2'
              iconCSS='text-red-400 hover:text-red-600'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDelete(task.id);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </li>
  );
}
