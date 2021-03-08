import ClayButton from '@clayui/button';
import ClayNavigationBar from '@clayui/navigation-bar';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '../../hooks/useLang';
import NavigationOptions from '../navigation-options';

const NavigationBar: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <ClayNavigationBar
      className="NavigationBar"
      triggerLabel="Liferay"
      style={{ borderBottom: '1px solid #F1F2F5', margin: 'auto', padding: 15 }}
    >
      <ClayNavigationBar.Item className="item" active>
        <ClayButton onClick={() => router.push('/')} displayType="unstyled">
          <img src="/assets/dxp-icon.svg"></img>
          <span className="ml-2">{i18n.get('app-title')}</span>
        </ClayButton>
      </ClayNavigationBar.Item>
      <NavigationOptions />
    </ClayNavigationBar>
  );
};

export default NavigationBar;
