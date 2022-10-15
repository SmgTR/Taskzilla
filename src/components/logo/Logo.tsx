import { NextPage } from 'next';
import Link from 'next/link';

interface Props {}

const Logo: NextPage<Props> = ({}) => {
  return (
    <div>
      <Link href="/">
        <h2 style={{ fontSize: '40px' }}>🦖</h2>
      </Link>
    </div>
  );
};

export default Logo;
