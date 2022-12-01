import { NextPage } from 'next';
import Logo from '@/components/logo/Logo';
import Button from '@/components/ui/buttons/Button';

import styles from './styles/MainPageHeader.module.scss';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {}

const MainPageHeader: NextPage<Props> = ({}) => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Logo />
      <nav>
        <Button
          btnText="Sign Up"
          title="Sign up"
          btnType="button"
          classStyle={styles.signUpButton}
          onClickHandler={() => router.push('/auth/signUp')}
        />

        <Button
          btnText="Sign In"
          title="Sign in"
          btnType="button"
          classStyle={styles.signInButton}
          onClickHandler={signIn}
        />
      </nav>
    </header>
  );
};

export default MainPageHeader;
