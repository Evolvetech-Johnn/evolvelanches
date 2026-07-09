import React from 'react';
import { Outlet } from 'react-router-dom'; // Placeholder for nested routes
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children ? children : <Outlet />} 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
