import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React from 'react';

import SEO from '../../components/meta';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const Welcome = (): React.ReactElement => {
  const router = useRouter();
  const i18n = useLang();

  return (
    <div className="welcome">
      <SEO title={i18n.sub('app-title-x', 'welcome')} />
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
          <ClayButton
            onClick={() => router.push('/welcome/gaps')}
            className="ml-3"
          >
            Continue
          </ClayButton>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Welcome);
