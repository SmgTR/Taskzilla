import Spline from '@splinetool/react-spline';

import styles from './styles/SplineImage.module.scss';

export default function Scene() {
  return (
    <Spline
      scene="https://prod.spline.design/FTwZ9K6WYirSwbJG/scene.splinecode"
      className={styles.spline}
    />
  );
}
