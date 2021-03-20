import ClayNavigationBar from '@clayui/navigation-bar';
import { useRouter } from 'next/router';
import React from 'react';

import { Tab } from '../templates/TeamTemplate';

type INavigationTabBar = {
  tabs: Tab[];
};

const NavigationTabBar: React.FC<INavigationTabBar> = ({ tabs }) => {
  const router = useRouter();

  return (
    <div className="navigation-tab-bar">
      <ClayNavigationBar
        triggerLabel={tabs.find(({ path }) => path === router.asPath).label}
      >
        {tabs.map(({ label, path }) => (
          <ClayNavigationBar.Item key={label} active={path === router.asPath}>
            <span className="nav-link link" onClick={() => router.push(path)}>
              {label}
            </span>
          </ClayNavigationBar.Item>
        ))}
      </ClayNavigationBar>
    </div>
  );
};

export default NavigationTabBar;
