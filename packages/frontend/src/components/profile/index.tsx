import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import React, { useContext } from 'react';

import AppContext from '../../AppContext';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';

export const ProfileWrapper: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const {
    state: {
      user: {
        loggedUser: { avatar_url, location, name },
      },
    },
  } = useContext(AppContext);

  return (
    <>
      <ProfileHeader
        name={name}
        avatar={avatar_url}
        role="teste"
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
