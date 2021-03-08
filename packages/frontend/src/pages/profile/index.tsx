import React from 'react';

import SEO from '../../components/meta';
import Profile, { ProfileWrapper } from '../../components/profile';
import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { getMe } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const Index = () => {
  const i18n = useLang();

  return (
    <Profile>
      <WrappedSafeComponent query={getMe}>
        {({ me }) => (
          <>
            <SEO title={i18n.sub('app-title-x', 'Profile')} />
            <ProfileWrapper me={me} />
          </>
        )}
      </WrappedSafeComponent>
    </Profile>
  );
};

export default withAuth(Index);
