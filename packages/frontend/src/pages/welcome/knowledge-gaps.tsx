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
          {i18n.get('knowledge-gaps')}
        </WelcomeContent.Title>
        <WelcomeContent.Body>body</WelcomeContent.Body>
        <WelcomeContent.Footer>
          <ClayButton
            displayType="secondary"
            className="mr-2"
            onClick={() => router.push('skills-details')}
          >
            {i18n.get('prev')}
          </ClayButton>

          <ClayButton onClick={() => router.push('success-page')}>
            {i18n.get('submit')}
          </ClayButton>
        </WelcomeContent.Footer>
      </WelcomeContent>
    </WelcomeTmpl>
  );
};

export default withAuth(KnowledgeGaps);
