import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React from 'react';

import WelcomeContent from '../../components/welcome/WelcomeContent';
import WelcomeTmpl from '../../components/welcome/WelcomeTmpl';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const KnowledgeGaps: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <WelcomeTmpl>
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
            onClick={() => router.push('/')}
          >
            {i18n.get('go-to-home')}
          </ClayButton>
        </WelcomeContent.Footer>
      </WelcomeContent>
    </WelcomeTmpl>
  );
};

export default withAuth(KnowledgeGaps);
