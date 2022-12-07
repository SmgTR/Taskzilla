import { NextPage } from 'next';

import styles from './DashboardModal.module.scss';
import { ReactNode } from 'react';
import { disablePopup, setActivePopup, usePopupContext } from '@/src/context/PopupContext';

interface Props {
  children: ReactNode;
  modalTitle: string;
}

const DashboardModal: NextPage<Props> = ({ children, modalTitle }) => {
  const [_, popupDispatch] = usePopupContext();
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{modalTitle}</h4>
      <span className={styles.close} onClick={() => popupDispatch(disablePopup())}>
        x
      </span>
      {children}
    </div>
  );
};

export default DashboardModal;
