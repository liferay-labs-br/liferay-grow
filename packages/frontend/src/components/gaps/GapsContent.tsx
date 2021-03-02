import ClayButton from '@clayui/button';
import React, { useContext } from 'react';

import useLang from '../../hooks/useLang';
import { steps } from './constants';
import GapsContext from './GapsContext';
import { Types } from './reducer/main-reducer';
import GapsGetStarted from './steps/GapsGetStarted';

const GapsContent: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const {
    dispatch,
    state: {
      main: { step: actualStep },
    },
  } = useContext(GapsContext);

  const actualStepIndex = steps.findIndex((step) => step === actualStep);

  const handleStep = (index) => {
    dispatch({ payload: steps[index], type: Types.EDIT_STEP });
  };

  return (
    <div className="gaps__content">
      <div className="gaps__content__box">
        <h1 className="gaps__content__box__title">{i18n.get(actualStep)}</h1>

        {actualStepIndex === 0 && <GapsGetStarted />}
        {actualStepIndex === 1 && <GapsGetStarted />}
        {actualStepIndex === 2 && <GapsGetStarted />}
        {actualStepIndex === 3 && <GapsGetStarted />}

        {actualStepIndex !== 0 && (
          <ClayButton
            displayType="secondary"
            className="mr-2"
            onClick={() => handleStep(actualStepIndex - 1)}
          >
            {i18n.get('prev')}
          </ClayButton>
        )}

        {actualStepIndex !== steps.length - 1 && (
          <ClayButton onClick={() => handleStep(actualStepIndex + 1)}>
            {i18n.get('next')}
          </ClayButton>
        )}
      </div>
    </div>
  );
};

export default GapsContent;
