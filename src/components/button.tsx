import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IButton {
  type: 'text' | 'icon';
  title: string;
  text?: string;
  icon?: IconProp;
  buttonCSS: string;
  iconCSS?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  type,
  title,
  text,
  icon,
  buttonCSS,
  iconCSS,
  onClick
}: IButton) {
  switch (type) {
    case 'text': {
      return (
        <button
          type='button'
          title={title}
          className={`rounded-lg transition-colors ${buttonCSS}`}
          onClick={onClick}
        >
          {text}
        </button>
      );
    }
    case 'icon': {
      return (
        <button
          type='button'
          title={title}
          className={`transition-colors ${buttonCSS}`}
          onClick={onClick}
        >
          {icon ? (
            <FontAwesomeIcon
              icon={icon}
              className={`h-4 w-4 transition-colors ${iconCSS}`}
            />
          ) : (
            <></>
          )}
        </button>
      );
    }
  }
}
