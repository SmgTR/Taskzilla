import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import { getSession } from 'next-auth/react';

import MainPage from '@/src/layouts/MainPage';
import Dashboard from '@/src/layouts/Dashboard';

const Home: NextPage<{ loggedIn: any }> = ({ loggedIn }) => {
  return <div className={styles.container}>{loggedIn ? <Dashboard /> : <MainPage />}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: { loggedIn: session }
  };
};

export default Home;
