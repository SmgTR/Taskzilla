import { NextPage } from 'next';

import styles from './MoreButton.module.scss';

interface Props {
  title: string;
  btnType: 'button' | 'submit' | 'reset';
  className?: string;
  onClickHandler?: () => void;
}

const MoreButton: NextPage<Props> = ({ className, title, btnType, onClickHandler }) => {
  return (
    <>
      <button
        className={`${className ? className : styles.moreButton}`}
        title={title}
        type={btnType}
        onClick={onClickHandler}
      >
        <span className={`${className ? '' : styles.moreButton_dot}`}></span>
        <span className={`${className ? '' : styles.moreButton_dot}`}></span>
        <span className={`${className ? '' : styles.moreButton_dot}`}></span>
      </button>
    </>
  );
};

export default MoreButton;
