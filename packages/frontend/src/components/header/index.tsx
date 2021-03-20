import classNames from 'classnames';
import React from 'react';

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

type IHeader = {
  border?: boolean;
};

const Header: React.FC<IHeader> & {
  Avatar: React.ElementType;
  Info: React.ElementType;
  Title: React.ElementType;
} = ({ border = true, children }) => {
  return (
    <div
      className={classNames('header', {
        'header--border': border,
      })}
    >
      {children}
    </div>
  );
};

Header.Info = HeaderInfo;
Header.Avatar = HeaderAvatar;
Header.Title = HeaderTitle;
export default Header;
