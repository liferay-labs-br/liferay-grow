import { useRouter } from 'next/router';
import React from 'react';

import ListView from '@/components/list-view';
import TeamTemplate from '@/components/templates/TeamTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getMembersTeam } from '@/graphql/queries';

const Members: React.FC = () => {
  const {
    query: { team },
  } = useRouter();

  const columns = [
    {
      key: 'name',
      render: (_, member) => (
        <span>
          <img
            className="team__members--avatar"
            alt={member.github.name}
            src={member.github.avatar_url}
          />
          <strong>{member.github.name}</strong>
        </span>
      ),
      value: 'Member',
    },
    {
      key: 'role',
      render: () => <span>Member Rule</span>,
      value: 'Role',
    },
    {
      key: 'email',
      render: (_, member) => <span>{member.github.email}</span>,
      value: 'Emal',
    },
  ];

  return (
    <WrappedSafeComponent
      query={getMembersTeam}
      options={{ variables: { team } }}
    >
      {({ getTeam: { members } }) => {
        const rows = members?.rows ? members.rows : [];
        return (
          <div className="team__members">
            <TeamTemplate>
              <ListView
                columns={columns}
                items={rows}
                activeDelta={1}
                activePage={1}
                totalItems={rows.length}
                searchOnChange={(value) => console.log(value)}
                orderBy
              />
            </TeamTemplate>
          </div>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default Members;
