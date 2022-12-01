import { NextPage } from 'next';

import SignUpForm from '@/components/auth/SignUpForm';

import styles from './styles/AuthScreen.module.scss';

import Image from 'next/image';
import AuthCarousel from '@/src/components/ui/carousels/AuthCarousel';
import { useEffect, useRef, useState } from 'react';
import SignInForm from '../components/auth/SignInForm';
import gsap from 'gsap';

interface Props {
  displayForm: string;
}

const AuthScreen: NextPage<Props> = ({ displayForm }) => {
  const [currentForm, setCurrentForm] = useState('');
  const signUpContainer = useRef<HTMLDivElement>(null);
  const signInContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentForm(displayForm.trim());
  }, [displayForm]);

  const switchFormHandler = () => {
    if (currentForm === 'signUp') {
      gsap.fromTo(
        signUpContainer.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.6,
          opacity: 0,
          onComplete: () => {
            setCurrentForm('signIn');
          }
        }
      );
    } else {
      gsap.fromTo(
        signInContainer.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.6,
          opacity: 0,
          onComplete: () => {
            setCurrentForm('signUp');
          }
        }
      );
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          {currentForm === 'signUp' && (
            <div className={styles.signUpContainer} ref={signUpContainer}>
              <SignUpForm />
              <p className={styles.switchForm}>
                Already have an account? <span onClick={switchFormHandler}>Sign in</span>
              </p>
            </div>
          )}
          {currentForm === 'signIn' && (
            <div className={styles.signInContainer} ref={signInContainer}>
              <SignInForm />
              <p className={styles.switchForm}>
                Do not have an account yet? <span onClick={switchFormHandler}>Sign up</span>
              </p>
            </div>
          )}
        </div>

        <div className={styles.rightSideContainer}>
          <div>
            <Image src="/assets/design.png" alt="Taskzilla app" width="650" height="400" />
          </div>
          <div className={styles.carouselContainer}>
            <AuthCarousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthScreen;
