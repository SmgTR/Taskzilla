import gsap from 'gsap';
import { NextPage } from 'next';
import { useEffect, useRef } from 'react';

import styles from './ScrollInfo.module.scss';

const ScrollInfo: NextPage = () => {
  const scrollBall = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 0.75, ease: 'power3.out' } });
    timeline.fromTo(scrollBall.current, { y: -12 }, { y: '34', repeat: -1, duration: 4.2 });
    timeline.fromTo(
      scrollBall.current,
      { opacity: 1 },
      { opacity: 0, duration: 4.2, repeat: -1 },
      '<'
    );
  }, []);

  return (
    <div className={styles.scroll}>
      <span className={styles.scrollBall} ref={scrollBall}></span>
    </div>
  );
};

export default ScrollInfo;
