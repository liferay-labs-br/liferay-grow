import { useRouter } from 'next/router';
import React from 'react';

import { TeamTemplate } from '../_template';
import WrappedSafeComponent from '../../../components/WrappedSafeComponent';
import { getUserByLogin } from '../../../graphql/queries';
import withAuth from '../../../hocs/withAuth';
import { Me } from '../../../types';

const TeamByLogin = () => {
  const {
    query: { login },
  } = useRouter();

  return (
    <WrappedSafeComponent
      query={getUserByLogin}
      options={{ variables: { login } }}
    >
      {({ getUserByLogin }: { getUserByLogin: Me }) => (
        <TeamTemplate me={getUserByLogin} />
      )}
    </WrappedSafeComponent>
  );
};

export default withAuth(TeamByLogin);
