import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRef, FormEvent, useState, useEffect } from 'react';
import Button from '@/components/ui/buttons/Button';
import MainInput from '@/components/ui/inputs/MainInput';
import { createNewUser } from '@/network/user/createUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import styles from './AuthForm.module.scss';
import SocialLoginButton from '@/components/ui/buttons/SocialLoginButton';

const SignUpForm: NextPage = () => {
  const formEl = useRef<HTMLFormElement>(null);

  const [signUpErrors, setSignUpErrors] = useState([] as string[]);

  const joinWithSocialHandler = async (provider: string) => {
    return await signIn(provider, { callbackUrl: '' });
  };

  const registerUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = [] as string[];

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
        setSignUpErrors([]);
        const userData = Object.assign({}, ...submittedValues);
        const newUser = await createNewUser(userData);

        if (newUser) {
          signIn('credentials', {
            email: userData.email,
            password: userData.password,
            callbackUrl: '/'
          });
        }
      } else {
        setSignUpErrors(validationError);
      }
    }
  };

  return (
    <>
      <h4 className={styles.pageTitle}>Sign Up</h4>

      <form ref={formEl} onSubmit={registerUser} className={styles.authForm}>
        <MainInput
          name="name"
          labelText="First Name *"
          title="name"
          type="text"
          required={true}
          id="name"
          placeholder="John"
        />
        <MainInput
          name="lastName"
          labelText="Last Name"
          title="lastName"
          type="text"
          required={false}
          id="lastName"
          placeholder="Doe"
        />
        <MainInput
          name="email"
          labelText="E-mail *"
          title="email"
          type="email"
          required={true}
          id="email"
          placeholder="john.doe@gmail.com"
        />
        <MainInput
          name="password"
          labelText="Password *"
          title="password"
          type="password"
          required={true}
          id="password"
        />
        <Button
          btnText="Sign up"
          title="Sign up"
          btnType="submit"
          classStyle={styles.submitButton}
        />
      </form>

      <div className={styles.socialSignUp}>
        <span className={styles.socialLabel}>or join with</span>
        <SocialLoginButton btnType="submit" onClickHandler={() => joinWithSocialHandler('google')}>
          <FontAwesomeIcon icon={faGoogle} /> Join with Google
        </SocialLoginButton>
        <SocialLoginButton
          btnType="submit"
          onClickHandler={() => joinWithSocialHandler('facebook')}
        >
          <FontAwesomeIcon icon={faFacebook} /> Join with Facebook
        </SocialLoginButton>
      </div>
      <ul className={styles.errorList}>
        {signUpErrors.map((error, index) => {
          return (
            <li key={index} className={styles.errorText}>
              {error}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SignUpForm;
