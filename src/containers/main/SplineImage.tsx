import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import { useRef } from 'react';

import styles from './styles/SplineImage.module.scss';

export default function SplineImage() {
  const splineItem = useRef();

  function onLoad(spline: { findObjectById: (arg0: string) => any }) {
    const obj = spline.findObjectById('72b294cc-9c84-42de-a37a-ea199438e5b7');

    splineItem.current = obj;
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          scene="https://prod.spline.design/FTwZ9K6WYirSwbJG/scene.splinecode"
          className={styles.spline}
          onLoad={onLoad}
        />
      </Suspense>
    </>
  );
}
