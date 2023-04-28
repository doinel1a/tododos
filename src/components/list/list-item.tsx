/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable unicorn/no-nested-ternary */
import { faClose, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import useUserAgent from '../../hooks/use-user-agent';
import { IList } from '../../types/list';
import Button from '../button';
import Form from '../form/form';
import Input from '../form/input';

interface IListItem {
  list: IList;
  onUpdate: (todoId: string, updatedTask: string) => void;
  onDelete: (todoId: string) => void;
}

export default function ListItem({ list, onUpdate, onDelete }: IListItem) {
  const { isMobile } = useUserAgent();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(list.name);

  useEffect(() => {
    if (isEditMode)
      document.body.addEventListener('click', handleOutsideClicks);
    else document.body.removeEventListener('click', handleOutsideClicks);

    return () => {
      document.body.removeEventListener('click', handleOutsideClicks);
    };
  }, [isEditMode]);

  function handleOutsideClicks(event: MouseEvent) {
    if ((event.target as Element).id !== 'edit') {
      setIsEditMode(false);
    }
  }

  const updateListName = (event: React.FormEvent) => {
    event.preventDefault();

    setIsEditMode(false);

    if (list.name !== updatedName) onUpdate(list.id, updatedName);
  };

  return (
    <li
      className='w-full border-b border-tertiary p-2 text-lg last:border-b-0 md:p-4'
      onMouseEnter={() => {
        if (!isMobile && !isEditMode) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isMobile && !isEditMode) setIsHovered(false);
      }}
    >
      {isEditMode ? (
        <div className='relative flex flex-col px-2'>
          <Form
            onSubmit={(event) => updateListName(event)}
            CSS='flex items-center border border-transparent'
          >
            <Input
              value={updatedName}
              shouldAutofocus={true}
              shouldClear={false}
              onChange={(event) => setUpdatedName(event.target.value)}
            />
            <FontAwesomeIcon
              icon={faSquarePen}
              className='absolute right-2 h-4 w-4 text-color-secondary'
            />
          </Form>
          <div className='mt-2 flex w-full flex-col justify-between text-xs text-color-secondary md:flex-row'>
            <span>Created: {list.createdAt}</span>
            {list.updatedAt === '' ? (
              <></>
            ) : (
              <span>Updated: {list.updatedAt}</span>
            )}
          </div>
        </div>
      ) : (
        <Link
          href={`/list/${list.name.toLowerCase().replaceAll(' ', '-')}`}
          title={`Go to '${list.name}' list`}
          className='relative flex flex-col'
        >
          <p
            title='Update list name'
            className='w-fit cursor-text rounded-lg border border-transparent px-2 hover:border-accent-primary'
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              setIsHovered(false);
              setIsEditMode(true);
            }}
          >
            {list.name}
          </p>
          <div className='mt-2 flex w-full flex-col justify-between px-2 text-xs text-color-secondary md:flex-row'>
            <span>Created: {list.createdAt}</span>
            {list.updatedAt === '' ? (
              <></>
            ) : (
              <span>Updated: {list.updatedAt}</span>
            )}
          </div>
          {isMobile ? (
            <Button
              type='icon'
              title='Delete list'
              icon={faClose}
              buttonCSS='absolute right-2'
              iconCSS='text-red-400 hover:text-red-600'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDelete(list.id);
              }}
            />
          ) : isHovered ? (
            <Button
              type='icon'
              title='Delete list'
              icon={faClose}
              buttonCSS='absolute right-2'
              iconCSS='text-red-400 hover:text-red-600'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDelete(list.id);
              }}
            />
          ) : (
            <></>
          )}
        </Link>
      )}
    </li>
  );
}
