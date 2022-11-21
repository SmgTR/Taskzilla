import { NextPage } from 'next';
import { ReactNode } from 'react';
import MainPageHeader from '../containers/main/MainPageHeader';
import MainPageHero from '../containers/main/MainPageHero';

interface Props {}

const MainPage: NextPage<Props> = () => {
  return (
    <div className="main_page_layout">
      <MainPageHeader />
      <MainPageHero />
    </div>
  );
};

export default MainPage;
