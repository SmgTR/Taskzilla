import { NextPage } from 'next';
import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';

import Button from '../../ui/buttons/Button';
import CookieImage from './CookieImage';

import styles from './CookiePopup.module.scss';

interface Props {}

const CookiePopup: NextPage<Props> = ({}) => {
  const text = useRef<HTMLDivElement>(null);
  const cookiesContainer = useRef<HTMLDivElement>(null);
  const cookie = useRef<SVGSVGElement>(null);
  const crumbs = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 0.75, ease: 'power1.out' } });
    timeline.fromTo(
      cookiesContainer.current ?? '',
      { scale: 0 },
      { scale: 1, ease: 'elastic.out(1, 0.6)', duration: 1.5 }
    );
    timeline.fromTo(
      text.current ?? '',
      { opacity: 0, x: 25 },
      { opacity: 1, x: 0, duration: 1 },
      '<50%'
    );
    timeline.fromTo(
      cookie.current ?? '',
      { opacity: 0, x: -25, rotation: '-65deg' },
      { opacity: 1, x: 0, rotation: '0deg' },
      '<'
    );
    timeline.fromTo(cookie.current ?? '', { y: 0 }, { y: -15, yoyo: true, repeat: -1 }, '>');
    timeline.fromTo(crumbs.current ?? '', { y: 0 }, { y: -15, yoyo: true, repeat: -1 }), '<';
  }, []);

  const closeCookiePopupHandler = () => {
    gsap.to(cookiesContainer.current, { opacity: 0, y: 100, duration: 0.75, ease: 'power1.out' });
  };

  return (
    <div className={styles.cookiesContainer} ref={cookiesContainer}>
      <CookieImage cookieRef={cookie} crumbsRef={crumbs} />

      <div className={styles.cookieText} ref={text}>
        <h2 className={styles.cookieTitle}>Cookie Policy</h2>
        <p>We use analytical cookies to make your experience better.</p>
        <Button
          btnText="Okay, got it"
          title="Accept cookie policy"
          btnType="button"
          classStyle={styles.cookieButton}
          onClickHandler={closeCookiePopupHandler}
        />
      </div>
    </div>
  );
};

export default CookiePopup;
