import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React from 'react';

import WelcomeContent from '../../components/welcome/WelcomeContent';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';
import ROUTES from '../../utils/routes';

const KnowledgeGaps: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <WelcomeContent>
      <WelcomeContent.Title>
        {i18n.get('application-submitted-successfully')}
      </WelcomeContent.Title>
      <WelcomeContent.Body>
        {i18n.get('thanks-for-helping-us-to-know-you-better')}
      </WelcomeContent.Body>
      <WelcomeContent.Footer>
        <ClayButton
          displayType="secondary"
          className="mr-2"
          onClick={() => router.push(ROUTES.HOME)}
        >
          {i18n.get('go-to-home')}
        </ClayButton>
      </WelcomeContent.Footer>
    </WelcomeContent>
  );
};

export default withAuth(KnowledgeGaps);
