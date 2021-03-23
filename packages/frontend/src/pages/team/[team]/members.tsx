import { useRouter } from 'next/router';
import React from 'react';

import ListView from '@/components/list-view';
import TeamTemplate from '@/components/templates/TeamTemplate';
import useLang from '@/hooks/useLang';

const Members: React.FC = () => {
  const i18n = useLang();

  const {
    push,
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
          <strong
            className="link"
            onClick={() => push(`/profile/${member.github.login}`)}
          >
            {member.github.name}
          </strong>
        </span>
      ),
      value: 'Member',
    },
    {
      key: 'role',
      render: (_, member) => (
        <span>{member.growMap.userDetails.role.name}</span>
      ),
      value: 'Role',
    },
    {
      key: 'email',
      render: (_, member) => <span>{member.github.email}</span>,
      value: 'Emal',
    },
  ];

  if (!team) {
    return null;
  }

  return (
    <div className="team__members">
      <TeamTemplate page="members">
        {({ getTeamBySlug: { members } }) => {
          const rows = members?.rows ? members.rows : [];
          const pagination = members?.pagination;

          return (
            <ListView
              columns={columns}
              items={rows}
              pagination={pagination}
              searchOnChange={(value) => console.log(value)}
              orderBy
              emptyState={{
                description: '',
                title: i18n.get('there-are-no-entries-yet'),
              }}
            />
          );
        }}
      </TeamTemplate>
    </div>
  );
};

export default Members;
