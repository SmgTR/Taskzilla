import { NextPage } from 'next';

import styles from './AddButton.module.scss';

interface Props {
  btnText: string;
  title: string;
  btnType?: 'button' | 'submit' | 'reset';
  onClickHandler?: () => void;
  classStyle: string;
}

const Button: NextPage<Props> = ({ btnText, title, btnType, onClickHandler, classStyle }) => {
  return (
    <>
      <button
        className={classStyle}
        title={title}
        type={btnType ? btnType : 'button'}
        onClick={onClickHandler}
      >
        {btnText}
      </button>
    </>
  );
};

export default Button;
