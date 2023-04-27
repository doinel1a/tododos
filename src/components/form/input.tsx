import { faClose } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef } from 'react';

import Button from '../button';

interface IInput {
  id?: string;
  value: string;
  placeholder?: string;
  CSS?: string;
  shouldAutofocus: boolean;
  shouldClear: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Input({
  id,
  value,
  placeholder,
  CSS,
  shouldAutofocus,
  shouldClear,
  onChange,
  onClear
}: IInput) {
  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      if (shouldAutofocus) inputReference.current?.focus();
    } /*, [] */
  );

  return (
    <div className='flex'>
      <input
        id={id}
        ref={inputReference}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`placeholder-color-secondary w-full bg-transparent focus:border-none focus:outline-none ${CSS}`}
      />
      {shouldClear ? (
        value.length > 2 ? (
          <Button
            type='icon'
            title='Clear input'
            icon={faClose}
            buttonCSS='ml-auto mr-4'
            iconCSS='text-color-primary hover:text-color-secondary'
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick={onClear!}
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
