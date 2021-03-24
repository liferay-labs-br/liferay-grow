import React from 'react';

import { UserTemplate } from '@/components/templates/ProfileTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getMe } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import { KnowledgeMatriz, Me } from '@/types';

type RequestProps = {
  allKnowledgeMatriz: KnowledgeMatriz[];
  me: Me;
};

const Profile = () => (
  <WrappedSafeComponent query={getMe}>
    {({ allKnowledgeMatriz, me }: RequestProps) => (
      <UserTemplate
        allKnowledgeMatriz={allKnowledgeMatriz}
        me={me}
        showDropDownActions
      />
    )}
  </WrappedSafeComponent>
);

export default withAuth(Profile);
