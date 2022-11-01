import { NextPage } from 'next';

import styles from './Flare.module.scss';

interface Props {
  flareStyle?: string;
}

const Flare: NextPage<Props> = ({ flareStyle }) => {
  return <div className={`${styles.flare} ${flareStyle ?? ''}`}></div>;
};

export default Flare;
