import ClayButton from '@clayui/button';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import AppContext from '@/AppContext';
import SEO from '@/components/meta/Meta';
import useLang from '@/hooks/useLang';

import EmptyState from '../empty-state';
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
  const {
    state: {
      user: { loggedUser },
    },
  } = useContext(AppContext);

  const growMap = loggedUser?.user?.growMap;

  const onClickEditPage = () => {
    const step = currentStep === 'get-started' ? 'office-details' : currentStep;
    router.push(`/profile/${step}`);
  };

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
            <div className="welcome__content--box">
              {growMap ? (
                <EmptyState
                  title={i18n.get('grow-map-already-exists')}
                  description={i18n.get(
                    'you-need-to-go-through-the-profile-page',
                  )}
                >
                  <ClayButton onClick={onClickEditPage}>
                    {i18n.sub('click-here-to-edit-x', currentStep)}
                  </ClayButton>
                </EmptyState>
              ) : (
                children
              )}
            </div>
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
