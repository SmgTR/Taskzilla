import dynamic from 'next/dynamic';
import { Application } from '@splinetool/runtime';

import { useEffect, useRef, useState } from 'react';

import styles from './styles/SplineImage.module.scss';

export default function SplineImage() {
  const [splineItem, setSplineItem] = useState<Application>();
  useEffect(() => {
    const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/FTwZ9K6WYirSwbJG/scene.splinecode').then(() => {
      setSplineItem(spline);
    });
  }, []);

  return (
    <canvas id="canvas3d" className={`${styles.spline} ${splineItem ? styles.show : ''}`}></canvas>
  );
}
