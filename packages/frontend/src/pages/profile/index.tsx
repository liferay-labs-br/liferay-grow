import React from 'react';

import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { getMe } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';
import { Me } from '../../types';
import { UserTemplate } from './_template';

const Profile = () => (
  <WrappedSafeComponent query={getMe}>
    {({ me }: { me: Me }) => <UserTemplate me={me} />}
  </WrappedSafeComponent>
);

export default withAuth(Profile);
