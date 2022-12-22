import { NextPage } from 'next';

import styles from './DashboardModal.module.scss';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { disablePopup, usePopupContext } from '@/src/context/PopupContext';
import { gsap } from 'gsap';

interface Props {
  children: ReactNode;
  modalTitle: string;
  styleClass?: string;
  changeHandler: () => void;
}

const DashboardModal: NextPage<Props> = ({ children, modalTitle, styleClass, changeHandler }) => {
  const [_, popupDispatch] = usePopupContext();
  const modalContainer = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const [isClicked, setClicked] = useState(false);
  const hideHandler = () => {
    if (!isClicked) {
      const timeline = gsap.timeline({ default: { duration: 0.4 } });
      timeline.fromTo(modalContainer.current, { scale: 1 }, { scale: 0, duration: 0.4 });
      timeline.fromTo(
        backdrop.current,
        { opacity: 1 },
        {
          opacity: 0,
          onComplete: () => {
            setClicked(false), popupDispatch(disablePopup());
          }
        }
      ),
        '<';
    }
    setClicked(true);
    changeHandler();
  };

  useEffect(() => {
    gsap.fromTo(modalContainer.current, { scale: 0.8 }, { scale: 1, duration: 0.4 });
    gsap.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1 });
  }, []);

  return (
    <>
      <div className={styles.backdrop} onClick={hideHandler} ref={backdrop}></div>
      <div className={`${styles.container} ${styleClass ? styleClass : ''}`} ref={modalContainer}>
        <h4 className={styles.title}>{modalTitle}</h4>

        {children}
      </div>
    </>
  );
};

export default DashboardModal;
