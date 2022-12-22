import { FC } from 'react';

import styles from './CircleLoader.module.scss';

interface Props {
  styleClass?: string;
}

const CircleLoader: FC<Props> = ({ styleClass }) => {
  return (
    <div className={`${styles.ldsRing} ${styleClass ?? ''}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default CircleLoader;
