import ClayButton from '@clayui/button';
import ClayNavigationBar from '@clayui/navigation-bar';
import React from 'react';

const NavigationBar = () => {
  return (
    <ClayNavigationBar
      className="NavigationBar"
      triggerLabel="Liferay"
      style={{ borderBottom: '1px solid #F1F2F5', margin: 'auto', padding: 15 }}
    >
      <ClayNavigationBar.Item className="item" active>
        <ClayButton displayType="unstyled">
          <img src="/assets/dxp-icon.svg"></img>
          <span className="ml-2">Liferay DXP</span>
        </ClayButton>
      </ClayNavigationBar.Item>
      <ClayNavigationBar.Item active>
        <ClayButton displayType="unstyled" />
      </ClayNavigationBar.Item>
    </ClayNavigationBar>
  );
};

export default NavigationBar;
