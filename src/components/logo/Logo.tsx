import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

interface Props {}

const Logo: NextPage<Props> = ({}) => {
  return (
    <div>
      <Link href="/">
        <div>
          <Image src="/logotz.svg" height="50px" width="50px" alt="logo" />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
