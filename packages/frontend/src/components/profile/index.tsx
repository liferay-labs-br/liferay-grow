import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import React from 'react';

import { Me } from '../../types';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';

type IProfileWrapper = {
  me: Me;
};

export const ProfileWrapper: React.FC<IProfileWrapper> = ({ children, me }) => {
  const {
    github: { avatar_url, location, name },
  } = me;

  return (
    <>
      <ProfileHeader
        name={name}
        avatar={avatar_url}
        role={me.growMap?.userDetails?.role?.name}
        location={location}
      />

      <ClayLayout.Row className="mt-4">
        <ClayLayout.Col size={3}>
          <ClayCard className="p-4">
            <ProfileSidebar />
          </ClayCard>
        </ClayLayout.Col>
        <ClayLayout.Col size={9}>
          <ClayCard className="p-4">{children}</ClayCard>
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
