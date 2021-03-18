import ClayLayout from '@clayui/layout';
import React from 'react';

import Meta from '@/components/meta';
import Panel from '@/components/panel';
import HomeTemplate from '@/components/templates/HomeTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getAllOffice } from '@/graphql/queries';
import useLang from '@/hooks/useLang';
import { allOffice } from '@/types';

type TeamsProps = {
  offices: allOffice[];
};

const Teams: React.FC<TeamsProps> = ({ offices }) => {
  const i18n = useLang();

  return (
    <>
      {offices.map(({ city, country, id, name, teams }) => (
        <ClayLayout.Col key={id}>
          <Panel
            title={`${name} - ${city} / ${country}`}
            displayType="unstyled"
          >
            {teams.map((team) => {
              const membersCount = String(
                team.members?.pagination?.totalItems || 0,
              );

              return (
                <Panel.Item key={team.id}>
                  <Panel.Title className="title">{team.name}</Panel.Title>
                  <Panel.Body>
                    <span>{i18n.sub('x-members', membersCount)}</span>
                  </Panel.Body>
                </Panel.Item>
              );
            })}
          </Panel>
        </ClayLayout.Col>
      ))}
    </>
  );
};

const TeamsWrapper: React.FC = () => {
  const i18n = useLang();

  return (
    <HomeTemplate>
      <Meta title={i18n.sub('app-title-x', 'teams')}></Meta>
      <h1 className="ml-3 mb-4">{i18n.get('teams')}</h1>

      <WrappedSafeComponent query={getAllOffice}>
        {({ offices }) => <Teams offices={offices} />}
      </WrappedSafeComponent>
    </HomeTemplate>
  );
};

export default TeamsWrapper;
