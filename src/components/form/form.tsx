import React from 'react';

interface IForm {
  children: React.ReactNode;
  CSS?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ children, CSS, onSubmit }: IForm) {
  return (
    <form className={`w-full ${CSS}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
