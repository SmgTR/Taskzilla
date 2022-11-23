import { Application } from '@splinetool/runtime';

import { useEffect } from 'react';

import styles from './styles/SplineImage.module.scss';

export default function SplineImage() {
  useEffect(() => {
    const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/FTwZ9K6WYirSwbJG/scene.splinecode');
  }, []);

  return <canvas id="canvas3d" className={`${styles.spline}`}></canvas>;
}
