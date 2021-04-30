import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '@/hooks/useLang';

type Step = {
  name: string;
  path: string;
  symbol: string;
};

type SidebarItemProps = {
  active?: boolean;
  symbol: string;
  onClick: () => void;
};

type SidebarProps = {
  steps: Step[];
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  children,
  onClick,
  symbol,
}) => (
  <div
    onClick={onClick}
    className={classNames('sidebar__list--item', {
      'sidebar__list--active': active,
    })}
  >
    <ClayIcon fontSize={active ? 18 : 16} symbol={symbol} className="mr-4" />
    <span>{children}</span>
  </div>
);

const ProfileSidebar: React.FC<SidebarProps> = ({ steps }) => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <div className="sidebar">
      <div className="sidebar__list">
        {steps.map(({ name, path, symbol }) => (
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
