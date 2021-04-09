import ClayLayout from '@clayui/layout';
import React from 'react';

import Meta from '@/components/meta';
import Panel from '@/components/panel';
import HomeTemplate from '@/components/templates/HomeTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getAllTeams } from '@/graphql/queries';
import useLang from '@/hooks/useLang';
import { Team } from '@/types';

type TeamsProps = {
  teams: Team[];
};

const Teams: React.FC<TeamsProps> = ({ teams }) => {
  const i18n = useLang();

  return (
    <ClayLayout.Row className="mt-4">
      {teams.map((team) => {
        const membersCount = String(team.members?.pagination?.totalItems || 0);

        return (
          <Panel.Item key={team.id} href={`/team/${team.slug}`}>
            <Panel.Title className="title">{team.name}</Panel.Title>
            <Panel.Body>
              <span>{i18n.sub('x-members', membersCount)}</span>
            </Panel.Body>
          </Panel.Item>
        );
      })}
    </ClayLayout.Row>
  );
};

const TeamsWrapper: React.FC = () => {
  const i18n = useLang();

  return (
    <HomeTemplate>
      <Meta title={i18n.sub('app-title-x', 'teams')} />
      <h1>{i18n.get('teams')}</h1>

      <WrappedSafeComponent query={getAllTeams}>
        {({ teams }) => <Teams teams={teams} />}
      </WrappedSafeComponent>
    </HomeTemplate>
  );
};

export default TeamsWrapper;
