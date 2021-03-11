import ClayProgressBar from '@clayui/progress-bar';
import React from 'react';

import SEO from '../../components/meta';
import Profile, { ProfileWrapper } from '../../components/profile';
import ProfilePanel from '../../components/profile/ProfilePanel';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const Index = () => {
  const i18n = useLang();

  const skillDetails = [
    {
      id: '1',
      knowledgeMatriz: {
        name: 'Beginner',
      },
      knowledgeSkill: {
        name: 'Java',
      },
    },
    {
      id: '2',
      knowledgeMatriz: {
        name: 'Professional',
      },
      knowledgeSkill: {
        name: 'Prototyping',
      },
    },
    {
      id: '3',
      knowledgeMatriz: {
        name: 'Beginner',
      },
      knowledgeSkill: {
        name: 'Typescript',
      },
    },
  ];

  const gapsDetails = [
    {
      id: '1',
      knowledgeSkill: {
        name: 'Java',
      },
    },
    {
      id: '2',
      knowledgeSkill: {
        name: 'Prototyping',
      },
    },
    {
      id: '3',
      knowledgeSkill: {
        name: 'Typescript',
      },
    },
  ];

  return (
    <Profile>
      <SEO title={i18n.sub('app-title-x', 'Profile')} />
      <ProfileWrapper>
        <ProfilePanel title={i18n.get('skill-details')}>
          {skillDetails.map(
            ({ id, knowledgeMatriz, knowledgeSkill: { name: skillName } }) => (
              <ProfilePanel.Item key={id}>
                <ProfilePanel.Title>{skillName}</ProfilePanel.Title>
                <ProfilePanel.Body>
                  <span>{knowledgeMatriz.name}</span>
                </ProfilePanel.Body>
                <ClayProgressBar value={20} />
              </ProfilePanel.Item>
            ),
          )}
        </ProfilePanel>
        <ProfilePanel title={i18n.get('skill-details')}>
          {gapsDetails.map(({ id, knowledgeSkill: { name: skillName } }) => (
            <ProfilePanel.Item key={id}>
              <ProfilePanel.Title>{skillName}</ProfilePanel.Title>
            </ProfilePanel.Item>
          ))}
        </ProfilePanel>
      </ProfileWrapper>
    </Profile>
  );
};

export default withAuth(Index);
