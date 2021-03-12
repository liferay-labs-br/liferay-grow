import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '../../hooks/useLang';

const steps = [
  {
    name: 'knowledge-areas',
    path: '/profile',
    pathDynamic: '/profile/:user',
    symbol: 'books',
  },
  {
    name: 'teams',
    path: '/profile/teams',
    pathDynamic: '/profile/:user/teams',
    symbol: 'users',
  },
];

interface ISidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean;
  symbol: string;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
  active,
  children,
  onClick,
  symbol,
}) => (
  <div
    onClick={onClick}
    className={classNames('profile__sidebar__list--item', {
      'profile__sidebar__list--active': active,
    })}
  >
    <ClayIcon fontSize={active ? 22 : 16} symbol={symbol} className="mr-4" />
    <span>{children}</span>
  </div>
);

const ProfileSidebar: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const router = useRouter();
  const i18n = useLang();

  const login = router.query.login;

  const dynamicSteps = steps.map((step) => {
    if (login) {
      return {
        ...step,
        path: step.pathDynamic.replace(':user', login as string),
      };
    }

    return step;
  });

  return (
    <div className="profile__sidebar">
      <div className="profile__sidebar__list">
        {dynamicSteps.map(({ name, path, symbol }) => (
          <SidebarItem
            active={path === router.asPath}
            key={path}
            symbol={symbol}
            onClick={() => router.push(path)}
          >
            {i18n.get(name)}
          </SidebarItem>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
