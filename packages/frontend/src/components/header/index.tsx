import classNames from 'classnames';
import React from 'react';

import DropDown from '@/components/drop-down/DropDown';

const HeaderAvatar: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  ...props
}) => {
  return (
    <div>
      <img className="header__avatar" {...props}></img>
    </div>
  );
};

const HeaderTitle: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <h1 className="header__info--title">{children}</h1>;
};

const HeaderInfo: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <div className="header__info">{children}</div>;
};

interface IAction {
  action: () => void;
  name: string;
}

interface IHeaderProps extends React.HTMLAttributes<HTMLElement> {
  border?: boolean;
  centralized?: boolean;
  actions?: IAction[];
}

const Header: React.FC<IHeaderProps> & {
  Avatar: React.ElementType;
  Info: React.ElementType;
  Title: React.ElementType;
} = ({ actions, border = true, centralized = false, children }) => {
  return (
    <div
      className={classNames('header', {
        'header--border': border,
      })}
    >
      {centralized ? (
        <div className="container-fluid container-fluid-max-lg">{children}</div>
      ) : (
        children
      )}
      {actions && (
        <div className="mt-2">
          <DropDown actions={actions} />
        </div>
      )}
    </div>
  );
};

Header.Info = HeaderInfo;
Header.Avatar = HeaderAvatar;
Header.Title = HeaderTitle;
export default Header;
