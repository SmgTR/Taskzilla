import { NextPage } from 'next';

import styles from './MoreButton.module.scss';

interface Props {
  title: string;
  btnType: 'button' | 'submit' | 'reset';
}

const MoreButton: NextPage<Props> = ({ title, btnType }) => {
  return (
    <>
      <button className={styles.moreButton} title={title} type={btnType}>
        <span className={styles.moreButton_dot}></span>
        <span className={styles.moreButton_dot}></span>
        <span className={styles.moreButton_dot}></span>
      </button>
    </>
  );
};

export default MoreButton;
