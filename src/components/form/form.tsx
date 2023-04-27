import React from 'react';

interface IForm {
  id?: string;
  children: React.ReactNode;
  CSS?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ id, children, CSS, onSubmit }: IForm) {
  return (
    <form id={id} className={`w-full ${CSS}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
