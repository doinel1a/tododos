import React from 'react';

import useUserAgent from '@/hooks/use-user-agent';

import Form from './form';
import Input from './input';

interface IAddForm {
  inputValue: string;
  categoriesListLength: number;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onInputClear: React.MouseEventHandler<HTMLButtonElement>;
  onFormSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function AddForm({
  inputValue,
  categoriesListLength,
  onInputChange,
  onInputClear,
  onFormSubmit
}: IAddForm) {
  const { isMobile } = useUserAgent();

  return (
    <Form
      CSS={`border border-tertiary ${
        categoriesListLength > 0 ? 'rounded-t-lg' : 'rounded-lg'
      }`}
      onSubmit={(event) => onFormSubmit(event)}
    >
      <Input
        value={inputValue}
        placeholder='What needs to be handled?'
        CSS='p-3 md:p-4'
        shouldAutofocus={isMobile ? false : true}
        shouldClear={true}
        onChange={onInputChange}
        onClear={onInputClear}
      />
    </Form>
  );
}
