import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import React from 'react';

import useLang from '../../hooks/useLang';
import ProfileHeader from './ProfileHeader';
import ProfilePanelSkill from './ProfilePanelSkill';

interface Github {
  id: string;
  login: string;
  avatar_url: string;
  email: string;
  name: string;
  company: string;
  location: string;
  bio: string;
}

interface User {
  id: string;
  github: Github;
}

interface IProfileWrapperProps extends React.HTMLAttributes<HTMLElement> {
  me: User;
}

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

export const ProfileWrapper: React.FC<IProfileWrapperProps> = ({ me }) => {
  const i18n = useLang();

  const {
    github: { avatar_url, location, name },
  } = me;

  return (
    <>
      <ProfileHeader
        name={name}
        avatar={avatar_url}
        role="teste"
        location={location}
      />

      <ClayLayout.Row className="mt-4">
        <ClayLayout.Col size={2}>
          <ClayCard className="p-4">{'One of two columns'}</ClayCard>
        </ClayLayout.Col>
        <ClayLayout.Col size={10}>
          <ClayCard className="p-4">
            <ProfilePanelSkill
              title={i18n.get('skill-details')}
              skills={skillDetails}
            />
            <ProfilePanelSkill
              title={i18n.get('knowledge-gaps')}
              skills={gapsDetails}
            />
          </ClayCard>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </>
  );
};

export const Profile: React.FC<React.HTMLAttributes<HTMLElement>> & {
  Header: React.ElementType;
} = ({ children }) => {
  return (
    <ClayLayout.ContainerFluid className="profile mt-4">
      {children}
    </ClayLayout.ContainerFluid>
  );
};

Profile.Header = ProfileHeader;

export { ProfileHeader };

export default Profile;
