import React from 'react';

import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getMe } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { TeamTemplate } from '@/pages/profile/_template';
import { Me } from '@/types';

const Teams = () => (
  <WrappedSafeComponent query={getMe}>
    {({ me }: { me: Me }) => <TeamTemplate me={me} />}
  </WrappedSafeComponent>
);

export default withAuth(Teams);
