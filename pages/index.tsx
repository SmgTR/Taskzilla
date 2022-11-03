import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

import MainPage from '@/src/layouts/MainPage';
import Dashboard from '@/src/layouts/Dashboard';
import { WorkspaceProvider } from '@/src/context/WorkspacesContext';

interface WorkspaceOutput {
  memberIn: Workspace[];
  guestIn: Workspace[];
}

const Home: NextPage<{ loggedIn: any; workspaces?: WorkspaceOutput }> = ({ loggedIn }) => {
  return <div className={styles.container}>{loggedIn ? <Dashboard /> : <MainPage />}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: { loggedIn: session }
  };
};

export default Home;
