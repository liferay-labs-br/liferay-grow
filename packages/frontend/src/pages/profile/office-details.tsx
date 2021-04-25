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
import {
  BasicQuery,
  GrowMapOfficeInput,
  Me,
  Office,
  Team,
  UserDetails,
} from '@/types';
import ROUTES from '@/utils/routes';

type GetStartedProps = {
  departments: BasicQuery[];
  teams: Team[];
  offices: Office[];
  roles: BasicQuery[];
  refetch: () => Promise<void>;
  me?: Me;
};

const GetStarted: React.FC<GetStartedProps> = ({
  departments,
  me,
  offices,
  refetch,
  roles,
  teams,
}) => {
  const { department, office, role, teams: userTeams } = me.growMap
    .userDetails as UserDetails;

  const [onUpdateGrowMapOffice] = useMutation(UpdateGrowMapOfficeDetails);

  const [form, setForm] = useState<GrowMapOfficeInput>({
    departmentId: department?.id,
    officeId: office?.id,
    roleId: role?.id,
    teamsId: userTeams.map(({ id }) => id),
  });

  const i18n = useLang();
  const router = useRouter();

  const canSave =
    form.departmentId && form.officeId && form.roleId && form.teamsId.length;

  const onSave = async () => {
    if (canSave) {
      try {
        await onUpdateGrowMapOffice({
          variables: {
            data: form,
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
        form={form}
        setForm={setForm}
        departments={departments}
        teams={teams}
        roles={roles}
        offices={offices}
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
              {(data) => (
                <GetStarted
                  me={me}
                  departments={data.departments.rows}
                  offices={data.offices.rows}
                  roles={data.roles.rows}
                  teams={data.teams.rows}
                  refetch={refetch}
                />
              )}
            </WrappedSafeComponent>
          </UserSkillTemplate>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default withAuth(OfficeDetails);
