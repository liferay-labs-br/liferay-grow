import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '../../hooks/useLang';
import { steps } from './constants';
import { getCurrentStep } from './utils';

interface ISidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
  active,
  children,
  onClick,
}) => (
  <li
    onClick={onClick}
    className={classNames('welcome__sidebar--item', {
      'welcome__sidebar--active': active,
    })}
  >
    <ClayIcon
      fontSize={active ? 22 : 16}
      symbol="simple-circle"
      className="mr-4"
    />
    <span>{children}</span>
  </li>
);

const WelcomeSidebar: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const router = useRouter();
  const i18n = useLang();
  const currentStep = getCurrentStep(router);

  return (
    <div className="welcome__sidebar">
      <ul>
        {steps.map((step) => (
          <SidebarItem
            active={step === currentStep}
            key={step}
            onClick={() => router.push(step)}
          >
            {i18n.get(step)}
          </SidebarItem>
        ))}
      </ul>
    </div>
  );
};

export default WelcomeSidebar;
