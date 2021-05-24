import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from '@apollo/client';
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
  Office,
  Team,
  User,
  UserDetails,
} from '@/types';
import ROUTES from '@/utils/routes';

type RequestProps = {
  me: User;
};

type RequestGetStartedProps = {
  departments: { rows: BasicQuery[] };
  offices: { rows: Office[] };
  roles: { rows: BasicQuery[] };
  teams: { rows: Team[] };
};

interface GetStartedProps<T> extends RequestGetStartedProps {
  refetch: (
    variables?: Partial<OperationVariables>,
  ) => Promise<ApolloQueryResult<T>>;
  me?: User;
}

const GetStarted = <T,>({
  departments,
  me,
  offices,
  refetch,
  roles,
  teams,
}: GetStartedProps<T>) => {
  const { department, office, role, teams: userTeams } = me.growMap
    .userDetails as UserDetails;

  const [onUpdateGrowMapOffice] = useMutation(UpdateGrowMapOfficeDetails);

  const [form, setForm] = useState<GrowMapOfficeInput>({
    departmentId: department?.id,
    officeId: office?.id,
    roleId: role?.id,
    teamsId: userTeams.map(({ id }) => id) || [],
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
        departments={departments.rows}
        teams={teams.rows}
        roles={roles.rows}
        offices={offices.rows}
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
    <WrappedSafeComponent<RequestProps> query={getMe}>
      {({ data: { me }, refetch }) => {
        return (
          <UserSkillTemplate me={me} title={i18n.get('office-details')}>
            <WrappedSafeComponent<RequestGetStartedProps> query={getStarted}>
              {({ data }) => <GetStarted me={me} {...data} refetch={refetch} />}
            </WrappedSafeComponent>
          </UserSkillTemplate>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default withAuth(OfficeDetails);
