import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '../../hooks/useLang';
import SEO from '../meta';
import { getCurrentStep } from './utils';
import WelcomeHeader from './WelcomeHeader';
import WelcomeSidebar from './WelcomeSidebar';

const WelcomeContentTitle: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <h1 className="welcome__content--box-title">{children}</h1>;
};

const WelcomeContentBody: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <div className="welcome__content--box-content">{children}</div>;
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
  const i18n = useLang();
  const router = useRouter();
  const currentStep = getCurrentStep(router);

  return (
    <ClayLayout.ContainerFluid className={currentStep}>
      <SEO title={i18n.sub('app-title-x', currentStep)} />
      <ClayLayout.Row>
        <ClayLayout.Col size={4}>
          <WelcomeSidebar />
        </ClayLayout.Col>
        <ClayLayout.Col>
          <WelcomeHeader />
          <hr />

          <div className="welcome__content">
            <div className="welcome__content--box">{children}</div>
          </div>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </ClayLayout.ContainerFluid>
  );
};

WelcomeContent.Title = WelcomeContentTitle;
WelcomeContent.Body = WelcomeContentBody;
WelcomeContent.Footer = WelcomeContentFooter;

export default WelcomeContent;
