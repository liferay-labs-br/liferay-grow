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
      {({ getAllKnowledgeMatriz, getTeamBySlug }) => {
        const { members, name } = getTeamBySlug;

        const totalItems = members?.pagination?.totalItems || 0;

        return (
          <>
            <Meta title={`${name} - ${i18n.get(page)}`} />
            <div className="team">
              <div className="team__header ml-2">
                <Header border={false} centralized>
                  <Header.Info>
                    <Header.Title>{name}</Header.Title>
                    {i18n.sub(
                      totalItems > 1 ? 'x-members' : 'x-member',
                      totalItems.toString(),
                    )}
                  </Header.Info>
                </Header>
              </div>
              <NavigationTabBar tabs={tabs}></NavigationTabBar>
              <div className="team__body">
                {typeof children === 'function'
                  ? children({ getAllKnowledgeMatriz, getTeamBySlug })
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
