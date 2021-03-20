import { useRouter } from 'next/router';
import React from 'react';

import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getTeam } from '@/graphql/queries';

import useLang from '../../hooks/useLang';
import Header from '../header';
import NavigationTabBar from '../navigation-tab-bar';

export type Tab = {
  label: string;
  path: string;
};

const TeamTemplate: React.FC = ({ children }) => {
  const {
    query: { team },
  } = useRouter();

  const i18n = useLang();
  const tabs = [
    {
      label: i18n.get('summary'),
      path: `/team/${team}`,
    },
    {
      label: i18n.get('members'),
      path: `/team/${team}/members`,
    },
  ];
  console.log(team);
  return (
    <WrappedSafeComponent query={getTeam} options={{ variables: { team } }}>
      {({
        getTeam: {
          members,
          name,
          office: { city, country },
        },
      }) => {
        const totalItems = members?.pagination?.totalItems;
        return (
          <div className="team">
            <div className="team__header">
              <Header border={false}>
                <Header.Info>
                  <Header.Title>{name}</Header.Title>
                  <p>{`${totalItems || 0} ${
                    totalItems > 1 ? 'members' : 'member'
                  }`}</p>
                  <p>{`${city}, ${country}`}</p>
                </Header.Info>
              </Header>
            </div>
            <NavigationTabBar tabs={tabs} />
            <div className="team__body">{children}</div>
          </div>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default TeamTemplate;
