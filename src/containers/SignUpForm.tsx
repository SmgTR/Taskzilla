import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRef, FormEvent, useState } from 'react';
import { createNewUser } from '../network/user/createUser';

import styles from './styles/SignUpForm.module.scss';

const SignUpForm: NextPage = () => {
  const formEl = useRef<HTMLFormElement>(null);

  const joinWithSocialHandler = async (provider: string) => {
    return await signIn(provider, { callbackUrl: '' });
  };

  const registerUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = [];

    if (formEl.current) {
      const formInputs = Array.from(formEl.current.elements) as HTMLInputElement[];
      const inputType = formInputs.filter((element) => {
        if (element.name) return element;
      });

      const submittedValues = inputType.map((input) => {
        input.classList.remove(styles.inputError);
        switch (input.name) {
          case 'name':
            if (input.value.length < 3) {
              !input.className.includes(styles.inputError)
                ? input.classList.add(styles.inputError)
                : '';

              validationError.push('Name cannot be less than 3 characters');

              break;
            } else {
              input.classList.remove(styles.inputError);
              break;
            }
          case 'email':
            if (
              !input.value
                .toLowerCase()
                .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
              !input.className.includes(styles.inputError)
                ? input.classList.add(styles.inputError)
                : '';
              validationError.push('Email is not correct');
            } else {
              input.classList.remove(styles.inputError);
              break;
            }
          case 'password':
            if (!input.value.match(/^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9!#$%&?]{8,20}$/)) {
              !input.className.includes(styles.inputError)
                ? input.classList.add(styles.inputError)
                : '';
              validationError.push(
                'Password must be at least 8 characters long and contain at least one uppercase letter and number'
              );
            } else {
              input.classList.remove(styles.inputError);
              break;
            }
        }
        return {
          [input.name]: input.value
        };
      });

      if (validationError.length == 0) {
        const userData = Object.assign({}, ...submittedValues);
        const newUser = await createNewUser(userData);

        if (newUser) {
          signIn('credentials', {
            email: userData.email,
            password: userData.password,
            callbackUrl: '/'
          });
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.pageTitle}>Sign Up</h4>

      <form ref={formEl} onSubmit={registerUser} className={styles.authForm}>
        <label htmlFor="name">First Name:</label>
        <input title="name" name="name" type="text" required />
        <label htmlFor="lastName">Last Name:</label>
        <input title="lastName" name="lastName" type="text" />
        <label htmlFor="email">Email:</label>
        <input title="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input title="password" name="password" type="password" required />
        <button type="submit">Sign up</button>
      </form>

      <div className={styles.socialSignUp}>
        <span>or join with</span>
        <button onClick={() => joinWithSocialHandler('google')} className={styles.socialButton}>
          Join with Google
        </button>
        <button onClick={() => joinWithSocialHandler('facebook')} className={styles.socialButton}>
          Join with Facebook
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
