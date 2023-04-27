import React from 'react';

import AddList from '@/components/list/add-list';
import MetaHead from '@/components/meta-head';

export default function Home() {
  return (
    <>
      <MetaHead
        title='NextTS — Starter'
        description='Start a NextJS Web App, SPA, website or landing page using TypeScript, Tailwind CSS, ESLint, Husky, Vercel and much more, in JUST 30 seconds, without the hassle of setting up your dev environment.'
        keywords='typescript, ts, react-typescript, react-ts, react, template, boilerplate, next-js, nextjs, vercel, tailwind, tailwindcss, sass, scss, css, github'
      />

      <main className='m-2 h-full w-full max-w-xl rounded-lg  bg-secondary p-2 md:m-4 md:p-4'>
        <AddList />
      </main>
    </>
  );
}
