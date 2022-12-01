import { NextPage } from 'next';
import { ReactNode } from 'react';

import styles from './SocialLoginButton.module.scss';

interface Props {
  onClickHandler?: () => void;
  btnType: 'button' | 'submit' | 'reset' | undefined;
  classStyle?: string;
  children: ReactNode;
}

const SocialLoginButton: NextPage<Props> = ({ onClickHandler, children, btnType, classStyle }) => {
  return (
    <button
      type={btnType}
      className={classStyle ?? styles.defaultSocialButton}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default SocialLoginButton;
