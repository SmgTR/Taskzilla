import { NextPage } from 'next';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './styles/MainPageHero.module.scss';

import dynamic from 'next/dynamic';
import Scene from './SplineImage';
import ScrollInfo from '@/src/components/main/scrollInfo/ScrollInfo';

interface Props {}

const MainPageHero: NextPage<Props> = ({}) => {
  const container = useRef<HTMLDivElement>(null);
  const flares = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subTitle = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1 } });
    timeline.fromTo(title.current, { y: -15, opacity: 0 }, { y: 0, opacity: 1, delay: 2 });
    timeline.fromTo(subTitle.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1 });
  }, []);

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
    <div className={styles.heroContainer} onMouseMove={mouseMovementHandler} ref={container}>
      <div className={styles.heroContent}>
        <div className={styles.texContainer}>
          <h2 ref={title}>
            The fastest way to build <br></br> and scale your workflow.
          </h2>
          <p ref={subTitle}>Manage your projects easily with our app</p>
        </div>

        <div className={styles.splineContainer}>
          <Scene />
        </div>
      </div>
      <ScrollInfo />
      <div className={styles.flares} ref={flares}>
        <div className={`${styles.flareContainer} ${styles.redFlare}`}></div>
        <div className={`${styles.flareContainer} ${styles.yellowFlare}`}></div>
        <div className={`${styles.flareContainer} ${styles.purpleFlare}`}></div>
      </div>
    </div>
  );
};

export default MainPageHero;
