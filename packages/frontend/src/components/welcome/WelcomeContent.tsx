import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React from 'react';

import useLang from '../../hooks/useLang';
import { steps } from './constants';
import { getCurrentStep } from './utils';

const WelcomeContent: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const i18n = useLang();
  const router = useRouter();
  const currentStep = getCurrentStep(router);
  const nextStep = steps[steps.indexOf(currentStep) + 1];
  const prevStep = steps[steps.indexOf(currentStep) - 1];

  return (
    <div className="welcome__content">
      <div className="welcome__content--box">
        <div className="welcome__content--box-content">
          <h1 className="welcome__content--box-title">
            {i18n.get(currentStep)}
          </h1>

          <div>{children}</div>
        </div>

        <div className="welcome__content--box-footer mt-4">
          {prevStep && (
            <ClayButton
              displayType="secondary"
              className="mr-2"
              onClick={() => router.push(prevStep)}
            >
              {i18n.get('prev')}
            </ClayButton>
          )}

          {nextStep && (
            <ClayButton onClick={() => router.push(nextStep)}>
              {i18n.get('next')}
            </ClayButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;
