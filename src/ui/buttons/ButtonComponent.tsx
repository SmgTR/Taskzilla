import Link from 'next/link';
import styles from './ButtonComponent.module.scss';

export default function ButtonComponent({ content, cssStyleName, href, ownStyles }: any) {
  let classNameString = cssStyleName
    ? `${styles.button} ${styles[`button--${cssStyleName}`]}`
    : `${styles.button}`;
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className={classNameString} style={ownStyles}>
            {content}
          </a>
        </Link>
      ) : (
        <button className={classNameString} style={ownStyles}>
          {content}
        </button>
      )}
    </>
  );
}
