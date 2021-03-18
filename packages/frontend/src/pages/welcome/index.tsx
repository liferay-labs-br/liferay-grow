import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React from 'react';

import SEO from '../../components/meta';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';
import ROUTES from '../../utils/routes';

const Welcome: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const router = useRouter();
  const i18n = useLang();

  return (
    <div className="welcome">
      <SEO title={i18n.sub('app-title-x', 'welcome')} />

      <div className="welcome__box">
        <h1 className="welcome__box--title">
          {i18n.get('welcome-to-the-engineering-team-program-grow-together')}
        </h1>

        <p className="welcome__box--description">
          {i18n.get(
            'to-start-help-us-to-get-to-know-you-better-please-fill-out-in-form-with-your-skills-and-gaps',
          )}
        </p>

        <div className="welcome__box--buttons">
          <ClayButton
            displayType="secondary"
            onClick={() => router.push(ROUTES.HOME)}
          >
            {i18n.get('skip-it')}
          </ClayButton>

          <ClayButton
            onClick={() => router.push(ROUTES.GET_STARTED)}
            className="ml-3"
          >
            {i18n.get('continue')}
          </ClayButton>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Welcome);
