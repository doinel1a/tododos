import React, { useEffect, useState } from 'react';

import Layout from '@/components/layout/layout';
import AddList from '@/components/list/add-list';
import Lists from '@/components/list/lists';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <Layout>
      <AddList />
      <Lists />
    </Layout>
  ) : (
    <></>
  );
}
