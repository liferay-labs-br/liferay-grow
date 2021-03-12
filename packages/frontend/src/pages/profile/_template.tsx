import ClayProgressBar from '@clayui/progress-bar';
import React from 'react';

import EmptyState from '../../components/empty-state';
import SEO from '../../components/meta';
import Profile, { ProfileWrapper } from '../../components/profile';
import ProfilePanel from '../../components/profile/ProfilePanel';
import useLang from '../../hooks/useLang';
import { Me } from '../../types';

type ITemplateProps = {
  me: Me;
};

const TeamTemplate: React.FC<ITemplateProps> = ({ me }) => {
  const i18n = useLang();

  return (
    <Profile>
      <SEO title={i18n.sub('app-title-x', 'Team')} />
      <ProfileWrapper me={me}>
        {me.growMap ? (
          <ProfilePanel title={i18n.get('teams')}>
            {me.growMap.userDetails?.teams?.map(({ id, name }) => (
              <ProfilePanel.Item key={id}>
                <ProfilePanel.Title className="title">
                  {name}
                </ProfilePanel.Title>
                <ProfilePanel.Body>
                  <span>21 Members</span>
                </ProfilePanel.Body>
              </ProfilePanel.Item>
            ))}
          </ProfilePanel>
        ) : (
          <EmptyState />
        )}
      </ProfileWrapper>
    </Profile>
  );
};

const UserTemplate: React.FC<ITemplateProps> = ({ me }) => {
  const i18n = useLang();

  return (
    <Profile>
      <SEO title={i18n.sub('app-title-x', 'Profile')} />
      <ProfileWrapper me={me}>
        {me.growMap ? (
          <>
            <ProfilePanel title={i18n.get('skills-details')}>
              {me.growMap.knowledgeSkillDetails?.map(
                ({ id, knowledgeMatriz, knowledgeSkill }) => (
                  <ProfilePanel.Item key={id}>
                    <ProfilePanel.Title>
                      {knowledgeSkill.name}
                    </ProfilePanel.Title>
                    <ProfilePanel.Body>
                      <span>{knowledgeMatriz.name}</span>
                    </ProfilePanel.Body>
                    <ClayProgressBar value={100} />
                  </ProfilePanel.Item>
                ),
              )}
            </ProfilePanel>
            <ProfilePanel title={i18n.get('knowledge-gaps')}>
              {me.growMap.knowledgeGapsDetails?.map(
                ({ id, knowledgeSkill }) => (
                  <ProfilePanel.Item key={id}>
                    <ProfilePanel.Title>
                      {knowledgeSkill.name}
                    </ProfilePanel.Title>
                  </ProfilePanel.Item>
                ),
              )}
            </ProfilePanel>
          </>
        ) : (
          <EmptyState />
        )}
      </ProfileWrapper>
    </Profile>
  );
};

export { TeamTemplate, UserTemplate };
