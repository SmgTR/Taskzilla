import { useSession, getSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  return {
    props: { session }
  };
}
