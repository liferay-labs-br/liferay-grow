import { useRouter } from 'next/router';
import React from 'react';

import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getTeamBySlug } from '@/graphql/queries';

import useLang from '../../hooks/useLang';
import Header from '../header';
import Meta from '../meta';
import NavigationTabBar from '../navigation-tab-bar';

export type Tab = {
  label: string;
  path: string;
  children: React.ReactNode;
};

type TeamTeplateProps = {
  page: string;
};

const TeamTemplate: React.FC<TeamTeplateProps> = ({ children, page }) => {
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

  if (!team) {
    return null;
  }

  return (
    <WrappedSafeComponent
      query={getTeamBySlug}
      options={{ variables: { slug: team } }}
    >
      {({ getTeamBySlug }) => {
        const {
          members,
          name,
          office: { city, country },
        } = getTeamBySlug;

        const totalItems = members?.pagination?.totalItems;

        return (
          <>
            <Meta title={`${name} - ${i18n.get(page)}`}></Meta>
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
              <div className="team__body">
                {typeof children === 'function'
                  ? children({ getTeamBySlug })
                  : children}
              </div>
            </div>
          </>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default TeamTemplate;
