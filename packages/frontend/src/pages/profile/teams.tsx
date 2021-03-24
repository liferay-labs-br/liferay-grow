import React from 'react';

import { TeamTemplate } from '@/components/templates/ProfileTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getMe } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { Me } from '@/types';

const Teams = () => (
  <WrappedSafeComponent query={getMe}>
    {({ me }: { me: Me }) => <TeamTemplate me={me} showDropDownActions />}
  </WrappedSafeComponent>
);

export default withAuth(Teams);
