import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import { useRouter } from 'next/router';
import React from 'react';

import DropDown from '@/components/drop-down/DropDown';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import useLang from '@/hooks/useLang';
import { Me } from '@/types';

const defaultSteps = [
  {
    name: 'knowledge-areas',
    path: '/profile',
    pathDynamic: '/profile/:user',
    symbol: 'books',
  },
  {
    name: 'teams',
    path: '/profile/teams',
    pathDynamic: '/profile/:user/teams',
    symbol: 'users',
  },
];

type IProfileWrapper = {
  me: Me;
  steps?: Array<any>;
  showDropDownActions?: boolean;
};

export const ProfileWrapper: React.FC<IProfileWrapper> = ({
  children,
  steps = defaultSteps,
  me,
  showDropDownActions,
}) => {
  const {
    github: { avatar_url, location, name },
  } = me;

  const router = useRouter();
  const i18n = useLang();

  const login = router.query.login;

  const dynamicSteps = steps.map((step) => {
    if (login) {
      return {
        ...step,
        path: step.pathDynamic.replace(':user', login as string),
      };
    }

    return step;
  });

  return (
    <>
      <Header>
        <Header.Avatar draggable={false} src={avatar_url} />
        <Header.Info>
          <Header.Title>{name}</Header.Title>
          <p>{me.growMap?.userDetails?.role?.name}</p>
          <p>{location}</p>
        </Header.Info>
        {showDropDownActions && (
          <div className="mt-2">
            <DropDown
              actions={[
                {
                  action: () => router.push('/profile/skill-details'),
                  name: i18n.get('edit-knowledge-areas'),
                },
              ]}
            />
          </div>
        )}
      </Header>

      <ClayLayout.Row className="mt-4">
        <ClayLayout.Col size={3}>
          <ClayCard className="p-4">
            <Sidebar steps={dynamicSteps} />
          </ClayCard>
        </ClayLayout.Col>
        <ClayLayout.Col size={9}>
          <ClayCard className="p-4">{children}</ClayCard>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </>
  );
};

export const Profile: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <ClayLayout.ContainerFluid className="profile mt-4">
      {children}
    </ClayLayout.ContainerFluid>
  );
};

export default Profile;
