import ClayButton from '@clayui/button';
import React from 'react';

export default function Welcome (): React.ReactElement {
  return (
    <div className="welcome">
      <div className="welcome__box">
        <h1 className="welcome__box__title">
          Welcome to the Engineering team program, Grow Together
        </h1>
        <p className="welcome__box__description">
          To start, help us to get to know you better. Please fill out in the
          form with your skills and gaps.
        </p>

        <div className="welcome__box__buttons">
          <ClayButton displayType="secondary">Skip it</ClayButton>
          <ClayButton className="ml-3">Continue</ClayButton>
        </div>
      </div>
    </div>
  );
}
