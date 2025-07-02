import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const MainLayout = () => {
  return (
    <div className='w-full mx-auto dark:bg-black bg-white'>
      <Header></Header>
      <div className="min-h-screen w-11/12 mx-auto mt-10">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
