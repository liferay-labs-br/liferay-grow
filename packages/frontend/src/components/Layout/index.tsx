import React from 'react';

import NavigationBar from '../NavigationBar';

interface ILayout {
  children: React.ReactElement;
}

const Layout: React.FC = ({ children }: ILayout) => {
  return (
    <div className="application">
      <NavigationBar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
