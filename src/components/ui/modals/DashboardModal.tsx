import { NextPage } from 'next';

import styles from './DashboardModal.module.scss';
import { ReactNode } from 'react';
import { disablePopup, usePopupContext } from '@/src/context/PopupContext';

interface Props {
  children: ReactNode;
  modalTitle: string;
}

const DashboardModal: NextPage<Props> = ({ children, modalTitle }) => {
  const [_, popupDispatch] = usePopupContext();

  const hideOnOutClickHandler = () => {
    popupDispatch(disablePopup());
  };

  return (
    <>
      <div className={styles.backdrop} onClick={hideOnOutClickHandler}></div>
      <div className={styles.container}>
        <h4 className={styles.title}>{modalTitle}</h4>
        <span className={styles.close} onClick={() => popupDispatch(disablePopup())}>
          x
        </span>
        {children}
      </div>
    </>
  );
};

export default DashboardModal;
