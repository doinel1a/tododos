import React, { useEffect, useState } from 'react';

import AddList from '@/components/list/add-list';
import Lists from '@/components/list/lists';
import MetaHead from '@/components/meta-head';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <>
      <MetaHead
        title='NextTS — Starter'
        description='Start a NextJS Web App, SPA, website or landing page using TypeScript, Tailwind CSS, ESLint, Husky, Vercel and much more, in JUST 30 seconds, without the hassle of setting up your dev environment.'
        keywords='typescript, ts, react-typescript, react-ts, react, template, boilerplate, next-js, nextjs, vercel, tailwind, tailwindcss, sass, scss, css, github'
      />

      <main className='flex max-h-full w-full max-w-xl flex-col justify-center overflow-hidden rounded-lg bg-secondary p-2 md:p-4'>
        <AddList />
        <Lists />
      </main>
    </>
  ) : (
    <></>
  );
}
