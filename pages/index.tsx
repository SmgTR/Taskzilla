import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { getSession } from 'next-auth/react';

import getAllWorkspaces from './api/secure/workspace/getAllWorkspaces';
import MainPage from '@/src/containers/MainPage';
import Dashboard from '@/src/containers/Dashboard';
import { WorkspaceProvider } from '@/src/context/WorkspacesContext';

const Home: NextPage<{ loggedIn: any; workspaces: Workspace[] }> = ({ loggedIn }) => {
  return (
    <div className={styles.container}>
      {loggedIn ? (
        <WorkspaceProvider>
          <Dashboard />
        </WorkspaceProvider>
      ) : (
        <MainPage />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: { loggedIn: session }
  };
};

export default Home;
