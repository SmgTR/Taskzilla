import ButtonComponent from '@/src/ui/buttons/ButtonComponent';
import MainSection from '@/src/ui/section/MainSection';
import styles from './MainContent.module.scss';

export default function MainContent() {
  return (
    <main className={styles.container}>
      <div id="top-section">
        <h1 className={styles.mainHeadline}>
          The fastest way to <br></br>build and scale your{' '}
          <span className={styles.decorSpan}>workflow</span>.
        </h1>
        <h3 className={styles.headline}>Get your work easily done with our app</h3>
        <ButtonComponent
          content="GET STARTED"
          cssStyleName="solid"
          ownStyles={{
            fontFamily: 'Oswald',
            fontSize: '34px',
            padding: '10px 30px',
            marginTop: '20px'
          }}
        />
      </div>

      {/* <MainSection/>
        <MainSection/>
        <MainSection/> */}
    </main>
  );
}
