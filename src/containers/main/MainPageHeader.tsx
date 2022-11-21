import { NextPage } from 'next';
import Logo from '@/components/logo/Logo';
import Button from '@/components/ui/buttons/Button';

import styles from './styles/MainPageHeader.module.scss';

interface Props {}

const MainPageHeader: NextPage<Props> = ({}) => {
  return (
    <header className={styles.header}>
      <Logo />
      <nav>
        <Button
          btnText="Sign Up"
          title="Sign up"
          btnType="button"
          classStyle={styles.signUpButton}
        />
        <Button
          btnText="Sign In"
          title="Sign in"
          btnType="button"
          classStyle={styles.signInButton}
        />
      </nav>
    </header>
  );
};

export default MainPageHeader;
