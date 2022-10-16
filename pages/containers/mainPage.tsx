import { useSession, getSession, signIn, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

export default function MainPage() {
  return (
    <>
      <h1>TO JEST MAIN</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return { redirect: { permanent: false, destination: '/register' } };
  }

  return { props: {} };
};
