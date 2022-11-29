import { NextPage } from 'next';
import CookiePopup from '@/components/main/cookiePopup/CookiePopup';
import MainPageHeader from '@/containers/main/MainPageHeader';
import MainPageHero from '@/containers/main/MainPageHero';

interface Props {}

const MainPage: NextPage<Props> = () => {
  return (
    <div className="main_page_layout">
      <MainPageHeader />
      <MainPageHero />
      <CookiePopup />
    </div>
  );
};

export default MainPage;
