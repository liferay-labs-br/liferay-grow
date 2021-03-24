import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayNavigationBar from '@clayui/navigation-bar';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '@/hooks/useLang';
import ROUTES from '@/utils/routes';

import NavigationOptions from '../navigation-options';

const NavigationBar: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <ClayNavigationBar className="NavigationBar" triggerLabel="Liferay">
      <ClayNavigationBar.Item className="item" active>
        <>
          <ClayButtonWithIcon
            onClick={() => router.back()}
            displayType="unstyled"
            symbol="angle-left"
          />

          <ClayButton
            onClick={() => router.push(ROUTES.HOME)}
            displayType="unstyled"
          >
            <img src="/assets/dxp-icon.svg"></img>
            <span className="ml-2">{i18n.get('app-title')}</span>
          </ClayButton>
        </>
      </ClayNavigationBar.Item>

      <NavigationOptions />
    </ClayNavigationBar>
  );
};

export default NavigationBar;
