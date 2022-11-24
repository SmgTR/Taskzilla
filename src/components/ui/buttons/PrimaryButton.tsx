import { NextPage } from 'next';

import styles from './PrimaryButton.module.scss';

interface Props {
  btnText: string;
  title: string;
  btnType: 'button' | 'submit' | 'reset';
  style: Object;
  onClickHandler?: () => void;
}

const PrimaryButton: NextPage<Props> = ({ btnText, title, btnType, style, onClickHandler }) => {
  return (
    <>
      <button
        className={styles.primaryButton}
        title={title}
        type={btnType}
        style={style}
        onClick={onClickHandler}
      >
        {btnText}
      </button>
    </>
  );
};

export default PrimaryButton;
