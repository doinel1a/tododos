import React from 'react';

import Account from './account';

export default function Header() {
  return (
    <header className='absolute left-0 top-0 z-[1] flex w-full cursor-default justify-between'>
      <div className='relative flex w-auto justify-center bg-accent-primary'>
        <h1 className='text-color z-[1] select-none p-4 text-xl font-semibold sm:text-2xl md:text-3xl'>
          Tododos
        </h1>
        <div className='top absolute -right-[43px] -top-[31px] hidden h-0 w-0 rotate-90 border-b-[60px] border-t-[70px] border-b-transparent border-l-accent-primary border-t-transparent sm:-right-[40px] sm:block sm:border-l-[70px] md:-right-[43px] md:border-l-[76px]' />
      </div>
      <div className='relative flex justify-center bg-accent-primary'>
        <Account />
        <div className='top absolute -left-[33px] -top-[31px] hidden h-0 w-0 rotate-90 border-b-[60px] border-t-[70px] border-b-transparent border-l-accent-primary border-t-transparent sm:-right-[40px] sm:block sm:border-l-[70px] md:-right-[43px] md:border-l-[76px]' />
      </div>
    </header>
  );
}
