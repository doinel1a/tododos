/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable unicorn/no-nested-ternary */
import { faClose, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import useUserAgent from '../../hooks/use-user-agent';
import { ICategory } from '../../types/category';
import Button from '../button';
import Form from '../form/form';
import Input from '../form/input';

interface ICategoriesListItem {
  category: ICategory;
  onUpdate: (todoId: string, updatedTask: string) => void;
  onDelete: (todoId: string) => void;
}

export default function CategoriesListItem({
  category,
  onUpdate,
  onDelete
}: ICategoriesListItem) {
  const { isMobile } = useUserAgent();

  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(category.name);

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
    if ((event.target as Element).id !== 'edit') {
      setIsEditMode(false);
    }
  }

  const updateCategoryName = (event: React.FormEvent) => {
    event.preventDefault();

    if (category.name !== updatedName) {
      onUpdate(category.id, updatedName);
    }

    setIsEditMode(false);
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
            onSubmit={(event) => updateCategoryName(event)}
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
            <span>Created: {category.createdAt}</span>
            {category.updatedAt === '' ? (
              <></>
            ) : (
              <span>Updated: {category.updatedAt}</span>
            )}
          </div>
        </div>
      ) : (
        <Link
          href={`/category/${category.name.toLowerCase().replaceAll(' ', '-')}`}
          title={`Go to '${category.name}' tasks`}
          className='relative flex flex-col'
        >
          <p
            title='Update category name'
            className='w-fit cursor-text rounded-lg border border-transparent px-2 hover:border-accent-primary'
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              setIsHovered(false);
              setIsEditMode(true);
            }}
          >
            {category.name}
          </p>
          <div className='mt-2 flex w-full flex-col justify-between px-2 text-xs text-color-secondary md:flex-row'>
            <span>Created: {category.createdAt}</span>
            {category.updatedAt === '' ? (
              <></>
            ) : (
              <span>Updated: {category.updatedAt}</span>
            )}
          </div>
          {isMobile ? (
            <Button
              type='icon'
              title='Delete category'
              icon={faClose}
              buttonCSS='absolute right-2'
              iconCSS='text-red-400 hover:text-red-600'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDelete(category.id);
              }}
            />
          ) : isHovered ? (
            <Button
              type='icon'
              title='Delete category'
              icon={faClose}
              buttonCSS='absolute right-2'
              iconCSS='text-red-400 hover:text-red-600'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDelete(category.id);
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
