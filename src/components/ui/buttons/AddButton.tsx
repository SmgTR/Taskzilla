import { NextPage } from 'next';

import styles from './AddButton.module.scss';

interface Props {
  btnText: string;
  title: string;
  btnType?: 'button' | 'submit' | 'reset';
  onClickHandler?: () => void;
}

const AddButton: NextPage<Props> = ({ btnText, title, btnType, onClickHandler }) => {
  return (
    <>
      <button
        className={styles.addButton}
        title={title}
        type={btnType ? btnType : 'button'}
        onClick={onClickHandler}
      >
        {btnText}
      </button>
    </>
  );
};

export default AddButton;
