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
import { BasicQuery, Me, Office, Team } from '@/types';
import ROUTES from '@/utils/routes';

type BasicSelect = {
  id?: string;
  name?: string;
};

interface IGetStartedProps extends React.HTMLAttributes<HTMLElement> {
  teams: Team[];
  offices: Office[];
  roles: BasicQuery[];
  refetch: () => Promise<void>;
  me?: Me;
}

const GetStarted: React.FC<IGetStartedProps> = ({
  me,
  offices,
  refetch,
  roles,
  teams,
}) => {
  const { office, role, teams: userTeams } = me.growMap.userDetails;

  const [onUpdateGrowMapOffice] = useMutation(UpdateGrowMapOfficeDetails);

  const [selectedRole, setSelectedRole] = useState<BasicSelect>(role || {});
  const [selectedOffice, setSelectedOffice] = useState<BasicSelect>(
    office || {},
  );
  const [selectedTeams, setSelectedTeams] = useState<BasicQuery[]>(userTeams);

  const i18n = useLang();
  const router = useRouter();

  const canSave = selectedRole.id && selectedOffice.id && selectedTeams.length;

  const onSave = async () => {
    if (canSave) {
      try {
        await onUpdateGrowMapOffice({
          variables: {
            data: {
              officeId: selectedOffice.id,
              roleId: selectedRole.id,
              teamsId: selectedTeams.map(({ id }) => id),
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
        selectedOffice={selectedOffice}
        setSelectedOffice={setSelectedOffice}
        selectedRole={selectedRole}
        selectedTeams={selectedTeams}
        teams={teams}
        roles={roles}
        offices={offices}
        setSelectedRole={setSelectedRole}
        setSelectedTeams={setSelectedTeams}
      />

      <ClayButton displayType="secondary" className="mr-2" onClick={onCancel}>
        {i18n.get('cancel')}
      </ClayButton>

      <ClayButton disabled={!canSave} onClick={onSave}>
        {i18n.get('save')}
      </ClayButton>
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
