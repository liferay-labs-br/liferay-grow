import React from 'react';

import NavigationBar from '../navigation-bar';

const Layout: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children }) => {
  return (
    <div className="application">
      <NavigationBar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
