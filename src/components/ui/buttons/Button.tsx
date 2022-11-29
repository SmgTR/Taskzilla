import { NextPage } from 'next';
import { RefObject } from 'react';

import styles from './AddButton.module.scss';

interface Props {
  btnText: string;
  title: string;
  btnType?: 'button' | 'submit' | 'reset';
  onClickHandler?: () => void;
  classStyle: string;
  buttonRef?: RefObject<HTMLButtonElement>;
}

const Button: NextPage<Props> = ({
  btnText,
  title,
  btnType,
  onClickHandler,
  classStyle,
  buttonRef
}) => {
  return (
    <>
      <button
        className={classStyle}
        title={title}
        type={btnType ? btnType : 'button'}
        onClick={onClickHandler}
        ref={buttonRef}
      >
        {btnText}
      </button>
    </>
  );
};

export default Button;
