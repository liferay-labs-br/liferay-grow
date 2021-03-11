import React from 'react';

import SEO from '../../components/meta';
import Profile, { ProfileWrapper } from '../../components/profile';
import ProfilePanel from '../../components/profile/ProfilePanel';
import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { getAllTeam } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const Index = () => {
  const i18n = useLang();

  return (
    <WrappedSafeComponent query={getAllTeam}>
      {({ teams }) => (
        <Profile>
          <SEO title={i18n.sub('app-title-x', 'Profile')} />
          <ProfileWrapper>
            <ProfilePanel title={i18n.get('skill-details')}>
              {teams.map(({ id, name }) => (
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
          </ProfileWrapper>
        </Profile>
      )}
    </WrappedSafeComponent>
  );
};

export default withAuth(Index);
