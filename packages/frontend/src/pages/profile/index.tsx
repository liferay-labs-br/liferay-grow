import React from 'react';

import { UserTemplate } from '@/components/templates/ProfileTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getMe } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { KnowledgeMatriz, User } from '@/types';

type RequestProps = {
  allKnowledgeMatriz: KnowledgeMatriz[];
  me: User;
};

const Profile = () => (
  <WrappedSafeComponent query={getMe}>
    {({ allKnowledgeMatriz, me }: RequestProps) => (
      <UserTemplate allKnowledgeMatriz={allKnowledgeMatriz} me={me} />
    )}
  </WrappedSafeComponent>
);

export default withAuth(Profile);
