import React from 'react';

import { TeamTemplate } from '@/components/templates/ProfileTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getMe } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { User } from '@/types';

const Teams = () => (
  <WrappedSafeComponent query={getMe}>
    {({ me }: { me: User }) => <TeamTemplate me={me} />}
  </WrappedSafeComponent>
);

export default withAuth(Teams);
