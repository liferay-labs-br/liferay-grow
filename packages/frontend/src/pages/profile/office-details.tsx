import { useMutation } from '@apollo/client';
import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import OfficeDetailsBody from '@/components/office-details';
import { UserSkillTemplate } from '@/components/templates/ProfileSkillTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { UpdateGrowMapOfficeDetails } from '@/graphql/mutations';
import { getMe, getStarted } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { allOffice, BasicQuery, Me } from '@/types';
import ROUTES from '@/utils/routes';

type SelectedRole = {
  id?: string;
  name?: string;
};

interface IGetStartedProps extends React.HTMLAttributes<HTMLElement> {
  offices: allOffice[];
  roles: BasicQuery[];
  refetch: () => Promise<void>;
  me?: Me;
}

const GetStarted: React.FC<IGetStartedProps> = ({
  me,
  offices,
  refetch,
  roles,
}) => {
  const { role, teams } = me.growMap.userDetails;

  const [onUpdateGrowMapOffice] = useMutation(UpdateGrowMapOfficeDetails);

  const [selectedRole, setSelectedRole] = useState<SelectedRole>(role);
  const [selectedTeams, setSelectedTeams] = useState<BasicQuery[]>(teams);

  const i18n = useLang();
  const router = useRouter();

  const onSave = async () => {
    const roleId = selectedRole.id;
    const teamsId = selectedTeams.map(({ id }) => id);

    if (selectedRole.id && teamsId.length) {
      try {
        await onUpdateGrowMapOffice({
          variables: {
            data: {
              roleId,
              teamsId,
            },
          },
        });

        await refetch();
        toast.info(i18n.get('your-request-completed-successfully'));
      } catch (error) {
        toast.error(i18n.get('an-unexpected-error-occurred'));
      }
    }
  };

  const onCancel = () => {
    router.push(ROUTES.PROFILE);
  };

  return (
    <>
      <OfficeDetailsBody
        selectedRole={selectedRole}
        selectedTeams={selectedTeams}
        offices={offices}
        roles={roles}
        setSelectedRole={setSelectedRole}
        setSelectedTeams={setSelectedTeams}
      />

      <ClayButton displayType="secondary" className="mr-2" onClick={onCancel}>
        {i18n.get('cancel')}
      </ClayButton>

      <ClayButton onClick={onSave}>{i18n.get('save')}</ClayButton>
    </>
  );
};

const OfficeDetails = () => {
  const i18n = useLang();

  return (
    <WrappedSafeComponent query={getMe}>
      {({ me, refetch }) => {
        return (
          <UserSkillTemplate me={me} title={i18n.get('office-details')}>
            <WrappedSafeComponent query={getStarted}>
              {(data) => <GetStarted me={me} {...data} refetch={refetch} />}
            </WrappedSafeComponent>
          </UserSkillTemplate>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default withAuth(OfficeDetails);
