import ClayLayout from '@clayui/layout';
import React from 'react';

import Meta from '../components/meta';
import Panel from '../components/panel';
import WrappedSafeComponent from '../components/WrappedSafeComponent';
import { getAllOffice } from '../graphql/queries';
import useLang from '../hooks/useLang';
import Layout from './_template';

const Teams: React.FC = () => {
  const i18n = useLang();

  return (
    <Layout>
      <Meta title={i18n.sub('app-title-x', 'teams')}></Meta>
      <h1 className="ml-3">Teams</h1>
      <div className="mt-4">
        <WrappedSafeComponent query={getAllOffice}>
          {({ offices }) =>
            offices.map(({ city, country, id, name, teams }) => (
              <ClayLayout.Col size={12} key={id}>
                <Panel title={`${name} - ${city} / ${country}`}>
                  {teams.map((team) => (
                    <Panel.Item key={team.id}>
                      <Panel.Title className="title">{team.name}</Panel.Title>
                      <Panel.Body>
                        <span>
                          {i18n.sub(
                            'x-members',
                            team.members.length.toString(),
                          )}
                        </span>
                      </Panel.Body>
                    </Panel.Item>
                  ))}
                </Panel>
              </ClayLayout.Col>
            ))
          }
        </WrappedSafeComponent>
      </div>
    </Layout>
  );
};

export default Teams;
