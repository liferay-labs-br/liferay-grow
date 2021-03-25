import React from 'react';

import EmptyState from '@/components/empty-state';
import SEO from '@/components/meta';
import Panel from '@/components/panel';
import Profile, { ProfileWrapper } from '@/components/profile';
import useLang from '@/hooks/useLang';
import { KnowledgeMatriz, Me } from '@/types';

import ProgressBar from '../progress-bar/ProgressBar';

function getPercentOf(partialValue, totalValue) {
  return Number(((100 * partialValue) / totalValue).toFixed(1));
}

type ITemplateProps = {
  me: Me;
  allKnowledgeMatriz?: KnowledgeMatriz[];
  title?: string;
};

const Template: React.FC<ITemplateProps> = ({ children, me, title }) => {
  return (
    <Profile>
      <SEO title={title} />
      <ProfileWrapper me={me}>
        {me.growMap ? children : <EmptyState />}
      </ProfileWrapper>
    </Profile>
  );
};

const TeamTemplate: React.FC<ITemplateProps> = ({ me }) => {
  const i18n = useLang();

  return (
    <Template me={me} title={i18n.sub('app-title-x', 'teams')}>
      <Panel title={i18n.get('teams')}>
        {me.growMap?.userDetails?.teams?.map(({ id, members, name, slug }) => (
          <Panel.Item key={id} href={`/team/${slug}`}>
            <Panel.Title className="title">{name}</Panel.Title>
            <Panel.Body>
              <span>
                {i18n.sub(
                  'x-members',
                  String(members?.pagination?.totalItems || 0),
                )}
              </span>
            </Panel.Body>
          </Panel.Item>
        ))}
      </Panel>
    </Template>
  );
};

const UserTemplate: React.FC<ITemplateProps> = ({ allKnowledgeMatriz, me }) => {
  const i18n = useLang();

  return (
    <Template me={me} title={i18n.sub('app-title-x', 'profile')}>
      <>
        <Panel title={i18n.get('skills-details')}>
          {me.growMap?.knowledgeSkillDetails?.map(
            ({ id, knowledgeMatriz, knowledgeSkill }) => (
              <Panel.Item key={id}>
                <Panel.Title>{knowledgeSkill.name}</Panel.Title>
                <Panel.Body>
                  <span>{knowledgeMatriz.name}</span>
                </Panel.Body>
                <ProgressBar
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
          {me.growMap?.knowledgeGapsDetails?.map(({ id, knowledgeSkill }) => (
            <Panel.Item key={id}>
              <Panel.Title>{knowledgeSkill.name}</Panel.Title>
            </Panel.Item>
          ))}
        </Panel>
      </>
    </Template>
  );
};

export { TeamTemplate, UserTemplate };
