import { ClayTooltipProvider } from '@clayui/tooltip';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import ListView from '@/components/list-view';
import Meta from '@/components/meta';
import HomeTemplate from '@/components/templates/HomeTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getAllTeams } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { Pagination, Team } from '@/types';

type RequestProps = {
  teams: {
    pagination: Pagination;
    rows: Team[];
  };
};

const Avatar = ({ profile, router }) => (
  <img
    onClick={() => router.push(`/profile/${profile.github_login}`)}
    className="avatar"
    data-tooltip-align="bottom"
    data-tooltip-delay={200}
    title={profile.name}
    alt={profile.name}
    src={profile.avatar_url}
  />
);

const TeamsWrapper: React.FC = () => {
  const i18n = useLang();
  const router = useRouter();

  const columns = [
    {
      key: 'name',
      render: (name, { slug }) => {
        return <Link href={`/team/${slug}`}>{name}</Link>;
      },
      value: i18n.get('team'),
    },
    {
      key: 'members',
      render: (members) => {
        if (!members) {
          return;
        }

        return (
          <ClayTooltipProvider>
            <div>
              {members.rows.map((row, index) => (
                <Avatar key={index} profile={row.profile} router={router} />
              ))}
            </div>
          </ClayTooltipProvider>
        );
      },
      value: i18n.get('members'),
    },
  ];

  return (
    <HomeTemplate>
      <Meta title={i18n.sub('app-title-x', 'teams')} />
      <h1>{i18n.get('teams')}</h1>

      <WrappedSafeComponent<RequestProps>
        query={getAllTeams}
        options={{
          variables: { data: { order: 'name', pageSize: 10, sort: 'DESC' } },
        }}
      >
        {({ data: { teams }, refetch, variables }) => {
          return (
            <ListView
              orderBy
              filterItems={[
                {
                  active: true,
                  label: i18n.get('Team'),
                  name: 'name',
                },
              ]}
              refetch={refetch}
              variables={variables}
              className="mt-4"
              items={teams?.rows}
              columns={columns}
              pagination={teams?.pagination}
            />
          );
        }}
      </WrappedSafeComponent>
    </HomeTemplate>
  );
};

export default withAuth(TeamsWrapper);
