// src/layout/MainLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 1. useLocation ইমপোর্ট করুন
import Navbar from '../components/shared/Navbar'; 
import Footer from '../components/shared/Footer';

const MainLayout = () => {
  
  const location = useLocation();

  
  const pathsWithoutFooter = ['/login', '/register'];

 
  const showFooter = !pathsWithoutFooter.includes(location.pathname);

  return (
    <div>
      <Navbar />
      <main className="min-h-[calc(100vh-250px)]">
        <Outlet />
      </main>
      
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;