import ClayProgressBar from '@clayui/progress-bar';
import React from 'react';

import EmptyState from '../../components/empty-state';
import SEO from '../../components/meta';
import Panel from '../../components/panel';
import Profile, { ProfileWrapper } from '../../components/profile';
import useLang from '../../hooks/useLang';
import { KnowledgeMatriz, Me } from '../../types';

function getPercentOf(partialValue, totalValue) {
  return Number(((100 * partialValue) / totalValue).toFixed(1));
}

type ITemplateProps = {
  me: Me;
  allKnowledgeMatriz?: KnowledgeMatriz[];
};

const TeamTemplate: React.FC<ITemplateProps> = ({ me }) => {
  const i18n = useLang();

  return (
    <Profile>
      <SEO title={i18n.sub('app-title-x', 'Team')} />
      <ProfileWrapper me={me}>
        {me.growMap ? (
          <Panel title={i18n.get('teams')}>
            {me.growMap.userDetails?.teams?.map(({ id, members, name }) => (
              <Panel.Item key={id}>
                <Panel.Title className="title">{name}</Panel.Title>
                <Panel.Body>
                  <span>
                    {i18n.sub('x-members', members.length.toString())}
                  </span>
                </Panel.Body>
              </Panel.Item>
            ))}
          </Panel>
        ) : (
          <EmptyState />
        )}
      </ProfileWrapper>
    </Profile>
  );
};

const UserTemplate: React.FC<ITemplateProps> = ({ allKnowledgeMatriz, me }) => {
  const i18n = useLang();

  return (
    <Profile>
      <SEO title={i18n.sub('app-title-x', 'Profile')} />
      <ProfileWrapper me={me}>
        {me.growMap ? (
          <>
            <Panel title={i18n.get('skills-details')}>
              {me.growMap.knowledgeSkillDetails?.map(
                ({ id, knowledgeMatriz, knowledgeSkill }) => (
                  <Panel.Item key={id}>
                    <Panel.Title>{knowledgeSkill.name}</Panel.Title>
                    <Panel.Body>
                      <span>{knowledgeMatriz.name}</span>
                    </Panel.Body>
                    <ClayProgressBar
                      value={getPercentOf(
                        knowledgeMatriz.matrizLevel,
                        allKnowledgeMatriz.length,
                      )}
                    />
                  </Panel.Item>
                ),
              )}
            </Panel>
            <Panel title={i18n.get('knowledge-gaps')}>
              {me.growMap.knowledgeGapsDetails?.map(
                ({ id, knowledgeSkill }) => (
                  <Panel.Item key={id}>
                    <Panel.Title>{knowledgeSkill.name}</Panel.Title>
                  </Panel.Item>
                ),
              )}
            </Panel>
          </>
        ) : (
          <EmptyState />
        )}
      </ProfileWrapper>
    </Profile>
  );
};

export { TeamTemplate, UserTemplate };
