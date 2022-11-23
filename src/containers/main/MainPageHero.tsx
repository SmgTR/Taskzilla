import { NextPage } from 'next';

import { useRef } from 'react';

import styles from './styles/MainPageHero.module.scss';

import SplineImage from './SplineImage';

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
        <div className={styles.text_container}>
          <h2>
            The fastest way to build <br></br> and scale your workflow.
          </h2>
          <p>Manage your projects easily with our app</p>
        </div>

        <div className={styles.spline_container}>
          <SplineImage />
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
