import AuthScreen from '@/src/containers/AuthScreen';
import SignUpForm from '@/src/containers/AuthScreen';
import { NextPage } from 'next';

interface Props {
  form: string;
}

const SignUp: NextPage<Props> = ({ form }) => {
  return <AuthScreen displayForm={form} />;
};

export async function getServerSideProps(context: any) {
  const form = context.query.sign;

  if (form != 'signUp' && form != 'signIn') {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  } else {
    return {
      props: {
        form
      }
    };
  }
}

export default SignUp;
