import React from 'react';

import NavigationBar from '../NavigationBar';

interface ILayout {
  children: React.ReactElement;
}

const Layout: React.FC = ({ children }: ILayout) => {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
};

export default Layout;
