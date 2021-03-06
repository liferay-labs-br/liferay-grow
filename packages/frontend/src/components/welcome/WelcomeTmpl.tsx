import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '../../hooks/useLang';
import SEO from '../meta';
import { getCurrentStep } from './utils';
import WelcomeHeader from './WelcomeHeader';
import WelcomeSidebar from './WelcomeSidebar';

const WelcomeTmpl: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
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

          {children}
        </ClayLayout.Col>
      </ClayLayout.Row>
    </ClayLayout.ContainerFluid>
  );
};

export default WelcomeTmpl;
