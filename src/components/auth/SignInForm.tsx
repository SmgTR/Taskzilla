import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRef, FormEvent, useState } from 'react';
import Button from '@/components/ui/buttons/Button';
import MainInput from '@/components/ui/inputs/MainInput';
import { createNewUser } from '@/network/user/createUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import styles from './AuthForm.module.scss';
import SocialLoginButton from '@/components/ui/buttons/SocialLoginButton';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';

const SignInForm: NextPage = () => {
  const formEl = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [loginErrors, setLoginErrors] = useState([] as string[]);

  const joinWithSocialHandler = async (provider: string) => {
    return await signIn(provider, { callbackUrl: '/' });
  };

  const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formEl.current) {
      const formInputs = Array.from(formEl.current.elements) as HTMLInputElement[];
      const inputType = formInputs.filter((element) => {
        if (element.name) return element;
      });
      const submittedValues = inputType.map((input) => {
        return { [input.name]: input.value };
      });

      const userData = Object.assign({}, ...submittedValues);

      const login = await signIn('credentials', {
        email: userData.email,
        password: userData.password,
        redirect: false
      });
      if (login?.error) return setLoginErrors(['Email or password are incorrect']);
      setLoginErrors([]);
      router.push('/');
    }
  };

  return (
    <>
      <h4 className={styles.pageTitle}>Sign In</h4>

      <form ref={formEl} onSubmit={loginHandler} className={styles.authForm}>
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
          btnText="Sign in"
          title="Sign in"
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
        {loginErrors.map((error, index) => {
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

export default SignInForm;
