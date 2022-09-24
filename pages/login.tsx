import { useSession, getSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    console.log(session.user);
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
  console.log(session);
  return {
    props: { session }
  };
}
