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
import { BasicQuery, Office, Team, Types } from '@/types';
import ROUTES from '@/utils/routes';

type GetStartedProps = {
  teams: Team[];
  departments: BasicQuery[];
  offices: Office[];
  roles: BasicQuery[];
};

type ResponseProps = {
  teams: { rows: Team[] };
  departments: { rows: BasicQuery[] };
  offices: { rows: Office[] };
  roles: { rows: BasicQuery[] };
};

const GetStarted: React.FC<GetStartedProps> = ({
  departments,
  offices,
  roles,
  teams,
}) => {
  const {
    dispatch,
    state: {
      welcome: { data },
    },
  } = useContext(AppContext);

  const [form, setForm] = useState(data.userDetails);

  const i18n = useLang();
  const router = useRouter();

  const canSave =
    form.departmentId && form.officeId && form.roleId && form.teamsId?.length;

  const saveData = () => {
    dispatch({
      payload: {
        ...data,
        userDetails: form,
      },
      type: Types.UPDATE_DATA,
    });
  };

  const onClickNextPage = () => {
    if (canSave) {
      saveData();

      dispatch({
        payload: { checked: true, value: 'get-started' },
        type: Types.UPDATE_STEP,
      });

      router.push(ROUTES.SKILLS_DETAILS);
    }
  };

  return (
    <WelcomeContent>
      <WelcomeContent.Title>{i18n.get('get-started')}</WelcomeContent.Title>
      <WelcomeContent.Body>
        <OfficeDetails
          form={form}
          departments={departments}
          setForm={setForm}
          teams={teams}
          roles={roles}
          offices={offices}
        />
      </WelcomeContent.Body>
      <WelcomeContent.Footer>
        <ClayButton disabled={!canSave} onClick={onClickNextPage}>
          {i18n.get('next')}
        </ClayButton>
      </WelcomeContent.Footer>
    </WelcomeContent>
  );
};

export default withAuth((props) => (
  <WrappedSafeComponent<ResponseProps> query={getStarted}>
    {({ data }) => (
      <GetStarted
        {...props}
        departments={data.departments?.rows}
        offices={data.offices?.rows}
        roles={data.roles?.rows}
        teams={data.teams?.rows}
      />
    )}
  </WrappedSafeComponent>
));
