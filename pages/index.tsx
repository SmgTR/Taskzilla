import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { getSession } from 'next-auth/react';

import MainPage from '@/src/layouts/MainPage';
import Dashboard from '@/src/layouts/Dashboard';
import { WorkspaceProvider } from '@/src/context/WorkspacesContext';
import WorkspaceList from '@/src/components/dashboard/workspacesList/WorkspaceList';

const Home: NextPage<{ loggedIn: any; workspaces: Workspace[] }> = ({ loggedIn }) => {
  return (
    <div className={styles.container}>
      {loggedIn ? (
        <WorkspaceProvider>
          <Dashboard>
            <WorkspaceList />
          </Dashboard>
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
