import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React from 'react';

import SEO from '../../components/meta';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const Welcome: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const router = useRouter();
  const i18n = useLang();

  return (
    <div className="welcome">
      <SEO title={i18n.sub('app-title-x', 'welcome')} />

      <div className="welcome__box">
        <h1 className="welcome__box--title">
          Welcome to the Engineering team program, Grow Together
        </h1>

        <p className="welcome__box--description">
          To start, help us to get to know you better. Please fill out in the
          form with your skills and gaps.
        </p>

        <div className="welcome__box--buttons">
          <ClayButton displayType="secondary" onClick={() => router.push('/')}>
            Skip it
          </ClayButton>

          <ClayButton
            onClick={() => router.push('/welcome/get-started')}
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
