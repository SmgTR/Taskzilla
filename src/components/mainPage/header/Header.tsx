import ButtonComponent from '@/src/ui/buttons/ButtonComponent';
import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <div id="logo">
        <ButtonComponent
          href="/"
          ownStyles={{ padding: 0 }}
          content={<Image src="/Taskzilla.svg" alt="404-logo" width="165" height="35" />}
        />
      </div>
      <div id="navigation" className={styles.navigation}>
        <ButtonComponent content="Log In" ownStyles={{ marginRight: '30px' }} href="/login" />
        <ButtonComponent content="Sign Up" cssStyleName="outline" />
      </div>
    </header>
  );
}
