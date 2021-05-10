import { useRouter } from 'next/router';
import React from 'react';

import ListView from '@/components/list-view';
import TeamTemplate from '@/components/templates/TeamTemplate';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { User } from '@/types';

const Members: React.FC = () => {
  const i18n = useLang();

  const {
    push,
    query: { team },
  } = useRouter();

  const columns = [
    {
      key: 'name',
      render: (_, member: User) => (
        <span>
          <img
            className="team__members--avatar"
            alt={member.profile.name}
            src={member.profile.avatar_url}
          />
          <strong
            className="link"
            onClick={() => push(`/profile/${member.profile.github_login}`)}
          >
            {member.profile.name}
          </strong>
        </span>
      ),
      value: i18n.get('member'),
    },
    {
      key: 'role',
      render: (_, member: User) => (
        <span>{member.growMap?.userDetails?.role?.name}</span>
      ),
      value: i18n.get('role'),
    },
    {
      key: 'email',
      render: (_, member: User) => <span>{member.profile.email}</span>,
      value: i18n.get('email'),
    },
  ];

  if (!team) {
    return null;
  }

  return (
    <div className="team__members">
      <TeamTemplate page="members">
        {({
          data: {
            getTeamBySlug: { members },
            refetch,
            variables,
          },
        }) => {
          const rows: User[] = members?.rows ? members.rows : [];
          const pagination = members?.pagination || {};

          return (
            <ListView
              columns={columns}
              items={rows}
              pagination={pagination}
              variables={variables}
              formatVariables={(newVariables) => ({
                ...variables,
                membersInput: {
                  ...variables.membersInput,
                  ...newVariables.data,
                },
              })}
              refetch={refetch}
              orderBy
              emptyState={{
                description: i18n.get('there-are-no-members-yet'),
              }}
            />
          );
        }}
      </TeamTemplate>
    </div>
  );
};

export default withAuth(Members);
