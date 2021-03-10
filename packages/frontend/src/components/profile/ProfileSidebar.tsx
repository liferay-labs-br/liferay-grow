import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '../../hooks/useLang';

const steps = [
  { name: 'skill-and-gaps', path: '/', symbol: 'books' },
  { name: 'teams', path: '/teams', symbol: 'users' },
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

  return (
    <div className="profile__sidebar">
      <div className="profile__sidebar__list">
        {steps.map(({ name, path, symbol }) => (
          <SidebarItem
            active={path === '/'}
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
