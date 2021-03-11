import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import AppContext from '../../AppContext';
import useLang from '../../hooks/useLang';
import { getCurrentStep } from './utils';

interface ISidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean;
  checked: boolean;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
  active,
  checked,
  children,
  onClick,
}) => (
  <li
    onClick={onClick}
    className={classNames('welcome__sidebar--item', {
      'welcome__sidebar--active': active,
      'welcome__sidebar--checked': checked,
    })}
  >
    <ClayIcon
      fontSize={active ? 22 : 16}
      symbol={checked ? 'check' : 'simple-circle'}
      className="mr-4"
    />
    <span>{children}</span>
  </li>
);

const WelcomeSidebar: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const {
    state: {
      welcome: { steps },
    },
  } = useContext(AppContext);
  const router = useRouter();
  const i18n = useLang();
  const currentStep = getCurrentStep(router);

  return (
    <div className="welcome__sidebar">
      <ul>
        {steps.map(({ checked, value }) => (
          <SidebarItem
            active={value === currentStep}
            checked={checked}
            key={value}
            onClick={() => router.push(value)}
          >
            {i18n.get(value)}
          </SidebarItem>
        ))}
      </ul>
    </div>
  );
};

export default WelcomeSidebar;
