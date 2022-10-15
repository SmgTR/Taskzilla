import { getSession } from 'next-auth/react';

import Dashboard from '@/src/layouts/Dashboard';

export default function Project() {
  return (
    <>
      <Dashboard projectNav={true}>
        <h4>Project</h4>
      </Dashboard>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  return {
    props: { session }
  };
}
