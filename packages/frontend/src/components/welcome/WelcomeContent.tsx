import React from 'react';

const WelcomeContentTitle: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <h1 className="welcome__content--box-title">{children}</h1>;
};

const WelcomeContentBody: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <div className="welcome__content--box-content">
      <div>{children}</div>
    </div>
  );
};

const WelcomeContentFooter: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <div className="welcome__content--box-footer mt-4">{children}</div>;
};

const WelcomeContent: React.FC<React.HTMLAttributes<HTMLElement>> & {
  Title: React.ElementType;
  Body: React.ElementType;
  Footer: React.ElementType;
} = ({ children }) => {
  return (
    <div className="welcome__content">
      <div className="welcome__content--box">{children}</div>
    </div>
  );
};

WelcomeContent.Title = WelcomeContentTitle;
WelcomeContent.Body = WelcomeContentBody;
WelcomeContent.Footer = WelcomeContentFooter;

export default WelcomeContent;
