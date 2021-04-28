import { useRouter } from 'next/router';
import React from 'react';

import { TeamTemplate } from '@/components/templates/ProfileTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getUserByLogin } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { User } from '@/types';

const TeamByLogin = () => {
  const {
    query: { login },
  } = useRouter();

  return (
    <WrappedSafeComponent
      query={getUserByLogin}
      options={{ variables: { login } }}
    >
      {({ user }: { user: User }) => <TeamTemplate me={user} />}
    </WrappedSafeComponent>
  );
};

export default withAuth(TeamByLogin);
