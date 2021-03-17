import { useRouter } from 'next/router';
import React from 'react';

import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getUserByLogin } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { TeamTemplate } from '@/pages/profile/_template';
import { Me } from '@/types';

const TeamByLogin = () => {
  const {
    query: { login },
  } = useRouter();

  return (
    <WrappedSafeComponent
      query={getUserByLogin}
      options={{ variables: { login } }}
    >
      {({ user }: { user: Me }) => <TeamTemplate me={user} />}
    </WrappedSafeComponent>
  );
};

export default withAuth(TeamByLogin);
