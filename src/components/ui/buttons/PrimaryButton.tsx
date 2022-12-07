import { NextPage } from 'next';

import styles from './PrimaryButton.module.scss';

interface Props {
  btnText: string;
  title: string;
  btnType: 'button' | 'submit' | 'reset';
  styleClass?: string;
  onClickHandler?: () => void;
}

const PrimaryButton: NextPage<Props> = ({
  btnText,
  title,
  btnType,
  styleClass,
  onClickHandler
}) => {
  return (
    <>
      <button
        className={`${styles.primaryButton} ${styleClass ?? ''}`}
        title={title}
        type={btnType}
        onClick={onClickHandler}
      >
        {btnText}
      </button>
    </>
  );
};

export default PrimaryButton;
