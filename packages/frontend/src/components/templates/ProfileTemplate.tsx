import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import AppContext from '@/AppContext';
import EmptyState from '@/components/empty-state';
import SEO from '@/components/meta';
import Panel from '@/components/panel';
import Profile, { ProfileWrapper } from '@/components/profile';
import useLang from '@/hooks/useLang';
import { KnowledgeMatriz, Me } from '@/types';
import ROUTES from '@/utils/routes';

type ITemplateProps = {
  me: Me;
  allKnowledgeMatriz?: KnowledgeMatriz[];
  title?: string;
};

const Template: React.FC<ITemplateProps> = ({ children, me, title }) => {
  const i18n = useLang();
  const router = useRouter();
  const {
    state: {
      user: { loggedUser },
    },
  } = useContext(AppContext);

  const belongsToMe = me.id === loggedUser.user.id;

  return (
    <Profile>
      <SEO title={title} />
      <ProfileWrapper me={me}>
        {me.growMap ? (
          children
        ) : (
          <EmptyState
            title={i18n.get('no-results-found')}
            description={i18n.get(
              belongsToMe
                ? 'you-must-create-knowledge-areas-and-knowledge-gaps'
                : 'there-are-no-entries-yet',
            )}
          >
            {belongsToMe && (
              <ClayButton
                onClick={() => router.push(ROUTES.WELCOME)}
                displayType="secondary"
              >
                {i18n.get('create-knowledge-area')}
              </ClayButton>
            )}
          </EmptyState>
        )}
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

const UserTemplate: React.FC<ITemplateProps> = ({ me }) => {
  const i18n = useLang();

  return (
    <Template me={me} title={i18n.sub('app-title-x', 'profile')}>
      <>
        <Panel title={i18n.get('skills-details')}>
          {me.growMap?.knowledgeSkillDetails?.map(
            ({ id, knowledgeMatriz, knowledgeSkill }) => (
              <Panel.Item key={id} href={`/skill/${knowledgeSkill.slug}`}>
                <Panel.Title>{knowledgeSkill.name}</Panel.Title>
                <Panel.Body>
                  <span>{knowledgeMatriz.name}</span>
                </Panel.Body>
                <Panel.ProgressBar partialValue={knowledgeMatriz.matrizLevel} />
              </Panel.Item>
            ),
          )}
        </Panel>
        <Panel title={i18n.get('knowledge-gaps')}>
          {me.growMap?.knowledgeGapsDetails?.map(({ id, knowledgeSkill }) => (
            <Panel.Item key={id} href={`/skill/${knowledgeSkill.slug}`}>
              <Panel.Title>{knowledgeSkill.name}</Panel.Title>
            </Panel.Item>
          ))}
        </Panel>
      </>
    </Template>
  );
};

export { TeamTemplate, UserTemplate };
