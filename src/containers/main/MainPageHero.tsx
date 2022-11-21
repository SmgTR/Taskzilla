import { NextPage } from 'next';
import Image from 'next/image';
import { useRef } from 'react';

import cards from '@/public/assets/cards.svg';

import styles from './styles/MainPageHero.module.scss';

interface Props {}

const MainPageHero: NextPage<Props> = ({}) => {
  const container = useRef<HTMLDivElement>(null);
  const flares = useRef<HTMLDivElement>(null);

  const mouseMovementHandler = (event: any) => {
    if (flares.current && container.current) {
      const x = (window.innerWidth + event.pageX * 6) / 90;
      let y = (window.innerHeight + event.pageY * 6) / 90;

      if (y > 0) {
        y += 40;
      }

      flares.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  return (
    <div className={styles.hero_container} onMouseMove={mouseMovementHandler} ref={container}>
      <div className={styles.hero_content}>
        <h2>
          The fastest way to build <br></br> and scale your workflow.
        </h2>
        <div className={styles.image_container}>
          <Image src={cards} alt="Task card image" draggable={false} />
        </div>
      </div>
      <div className={styles.flares} ref={flares}>
        <div className={`${styles.flareContainer} ${styles.redFlare}`}></div>
        <div className={`${styles.flareContainer} ${styles.yellowFlare}`}></div>
        <div className={`${styles.flareContainer} ${styles.purpleFlare}`}></div>
      </div>
    </div>
  );
};

export default MainPageHero;
