import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import { useRouter } from 'next/router';
import React from 'react';

import WelcomeContent from '../../components/welcome/WelcomeContent';
import WelcomeTmpl from '../../components/welcome/WelcomeTmpl';
import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { allKnowledgeSkills } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const KnowledgeGaps: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <WrappedSafeComponent query={allKnowledgeSkills}>
      {({ skills = [] }) => {
        return (
          <WelcomeTmpl>
            <WelcomeContent>
              <WelcomeContent.Title>
                {i18n.get('skills-details')}
              </WelcomeContent.Title>
              <WelcomeContent.Body>
                {skills.map((skill) => (
                  <ClayButton
                    displayType="secondary"
                    className="mr-2 mb-2"
                    key={skill.id}
                  >
                    {skill.name} <ClayIcon className="ml-1" symbol="plus" />
                  </ClayButton>
                ))}
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
          </WelcomeTmpl>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default withAuth(KnowledgeGaps);
