import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React from 'react';

import SkillContextProvider from '../../components/skill-management/SkillContextProvider';
import SkillManagement from '../../components/skill-management/SkillManagement';
import WelcomeContent from '../../components/welcome/WelcomeContent';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const KnowledgeGaps: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <SkillContextProvider>
      <WelcomeContent>
        <WelcomeContent.Title>
          {i18n.get('skills-details')}
        </WelcomeContent.Title>
        <WelcomeContent.Body>
          <SkillManagement />
        </WelcomeContent.Body>
        <WelcomeContent.Footer>
          <ClayButton
            displayType="secondary"
            className="mr-2"
            onClick={() => router.push('get-started')}
          >
            {i18n.get('prev')}
          </ClayButton>

          <ClayButton onClick={() => router.push('knowledge-gaps')}>
            {i18n.get('next')}
          </ClayButton>
        </WelcomeContent.Footer>
      </WelcomeContent>
    </SkillContextProvider>
  );
};

export default withAuth(KnowledgeGaps);
