import { NextPage } from 'next';
import { ReactNode } from 'react';
import Footer from '../components/mainPage/footer/Footer';
import Header from '../components/mainPage/header/Header';
import MainContent from '../components/mainPage/main/MainContent';

interface Props {}

const MainPage: NextPage<Props> = () => {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  );
};

export default MainPage;
