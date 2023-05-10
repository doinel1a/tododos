import React from 'react';

import Header from '../header/header';
import MetaHead from '../meta-head';

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <MetaHead
        title='NextTS — Starter'
        description='Start a NextJS Web App, SPA, website or landing page using TypeScript, Tailwind CSS, ESLint, Husky, Vercel and much more, in JUST 30 seconds, without the hassle of setting up your dev environment.'
        keywords='typescript, ts, react-typescript, react-ts, react, template, boilerplate, next-js, nextjs, vercel, tailwind, tailwindcss, sass, scss, css, github'
      />

      <Header />
      <main className='flex max-h-full w-full max-w-xl flex-col justify-center overflow-hidden rounded-lg bg-secondary p-2 md:p-4'>
        {children}
      </main>
    </>
  );
}
