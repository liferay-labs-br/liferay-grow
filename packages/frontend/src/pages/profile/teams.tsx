import React from 'react';

import { TeamTemplate } from '@/components/templates/ProfileTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getMe } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { User } from '@/types';

type RequestProps = {
  me: User;
};

const Teams = () => (
  <WrappedSafeComponent<RequestProps> query={getMe}>
    {({ data: { me } }) => <TeamTemplate me={me} />}
  </WrappedSafeComponent>
);

export default withAuth(Teams);
