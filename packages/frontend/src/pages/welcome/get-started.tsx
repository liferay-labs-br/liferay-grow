import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

import AppContext from '@/AppContext';
import OfficeDetails from '@/components/office-details';
import WelcomeContent from '@/components/welcome/WelcomeContent';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { getStarted } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { allOffice, BasicQuery, Types } from '@/types';
import ROUTES from '@/utils/routes';

/**
 * Get Started page must have these implemented functions
 * saveData: () => void;
 * onClickNextPage: () => void;
 * isEnableToNextPage: () => boolean;
 */

type SelectedRole = {
  id?: string;
  name?: string;
};

interface IGetStartedProps extends React.HTMLAttributes<HTMLElement> {
  offices: allOffice[];
  roles: BasicQuery[];
}

const GetStarted: React.FC<IGetStartedProps> = ({ offices, roles }) => {
  const {
    dispatch,
    state: {
      welcome: { data },
    },
  } = useContext(AppContext);
  const { role, teams } = data.userDetails;
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(() => {
    if (!role.id) {
      return {};
    }

    return role;
  });

  const [selectedTeams, setSelectedTeams] = useState<BasicQuery[]>(teams);

  const i18n = useLang();
  const router = useRouter();

  const isEnableToNextPage = () => {
    return selectedRole.id && !!selectedTeams.length;
  };

  const saveData = () => {
    dispatch({
      payload: {
        ...data,
        userDetails: {
          role: selectedRole,
          teams: selectedTeams,
        },
      },
      type: Types.UPDATE_DATA,
    });
  };

  const onClickNextPage = () => {
    saveData();

    dispatch({
      payload: { checked: isEnableToNextPage(), value: 'get-started' },
      type: Types.UPDATE_STEP,
    });

    router.push(ROUTES.SKILLS_DETAILS);
  };

  return (
    <WelcomeContent>
      <WelcomeContent.Title>{i18n.get('get-started')}</WelcomeContent.Title>
      <WelcomeContent.Body>
        <OfficeDetails
          selectedRole={selectedRole}
          selectedTeams={selectedTeams}
          offices={offices}
          roles={roles}
          setSelectedRole={setSelectedRole}
          setSelectedTeams={setSelectedTeams}
        />
      </WelcomeContent.Body>
      <WelcomeContent.Footer>
        <ClayButton disabled={!isEnableToNextPage()} onClick={onClickNextPage}>
          {i18n.get('next')}
        </ClayButton>
      </WelcomeContent.Footer>
    </WelcomeContent>
  );
};

export default withAuth((props) => (
  <WrappedSafeComponent query={getStarted}>
    {(data) => <GetStarted {...props} {...data} />}
  </WrappedSafeComponent>
));
