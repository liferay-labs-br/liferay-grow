import ClayButton from '@clayui/button';
import ClayNavigationBar from '@clayui/navigation-bar';
import React from 'react';

import useLang from '../../hooks/useLang';

const NavigationBar: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();

  return (
    <ClayNavigationBar
      className="NavigationBar"
      triggerLabel="Liferay"
      style={{ borderBottom: '1px solid #F1F2F5', margin: 'auto', padding: 15 }}
    >
      <ClayNavigationBar.Item className="item" active>
        <ClayButton displayType="unstyled">
          <img src="/assets/dxp-icon.svg"></img>
          <span className="ml-2">{i18n.get('app-title')}</span>
        </ClayButton>
      </ClayNavigationBar.Item>
      <ClayNavigationBar.Item active>
        <ClayButton displayType="unstyled" />
      </ClayNavigationBar.Item>
      <ul className="navbar-nav">
        <li className="dropdown nav-item">{/* <UserAvatar /> */}</li>
      </ul>
    </ClayNavigationBar>
  );
};

export default NavigationBar;
