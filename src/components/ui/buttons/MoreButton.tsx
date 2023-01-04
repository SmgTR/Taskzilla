import { NextPage } from 'next';

import styles from './MoreButton.module.scss';

interface Props {
  title: string;
  btnType: 'button' | 'submit' | 'reset';
  className?: string;
  dotsClass?: string;
  onClickHandler?: () => void;
}

const MoreButton: NextPage<Props> = ({ dotsClass, className, title, btnType, onClickHandler }) => {
  return (
    <>
      <button
        className={`${className ? className : styles.moreButton}`}
        title={title}
        type={btnType}
        onClick={onClickHandler}
      >
        <div className={dotsClass}>
          <span className={`${className ? '' : styles.moreButton_dot}`}></span>
          <span className={`${className ? '' : styles.moreButton_dot}`}></span>
          <span className={`${className ? '' : styles.moreButton_dot}`}></span>
        </div>
      </button>
    </>
  );
};

export default MoreButton;
