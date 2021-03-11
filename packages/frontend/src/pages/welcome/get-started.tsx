import ClayButton from '@clayui/button';
import ClayForm, { ClaySelect } from '@clayui/form';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

import AppContext from '../../AppContext';
import WelcomeContent from '../../components/welcome/WelcomeContent';
import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { getStarted } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

interface IGetStartedBodyProps extends React.HTMLAttributes<HTMLElement> {
  onChangeOffice: Dispatch<SetStateAction<string>>;
  onChangeRole: Dispatch<SetStateAction<string>>;
  offices: allOffice;
  roles: allRole;
}

const GetStartedBody: React.FC<IGetStartedBodyProps> = ({
  offices,
  onChangeOffice,
  onChangeRole,
  roles,
}) => {
  const i18n = useLang();

  return (
    <ClayForm>
      <ClayForm.Group>
        <label htmlFor="team">{i18n.get('team')}</label>
        <ClaySelect onChange={(e) => onChangeOffice(e.target.value)}>
          {offices.map((office) => (
            <optgroup key={office.id} label={office.name}>
              {office.teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </optgroup>
          ))}
        </ClaySelect>
      </ClayForm.Group>

      <ClayForm.Group>
        <label htmlFor="role">{i18n.get('role')}</label>
        <ClaySelect onChange={(e) => onChangeRole(e.target.value)}>
          {roles.map((roles) => (
            <option key={roles.id} value={roles.id}>
              {roles.name}
            </option>
          ))}
        </ClaySelect>
      </ClayForm.Group>
    </ClayForm>
  );
};

interface IGetStartedProps extends React.HTMLAttributes<HTMLElement> {
  offices: allOffice;
  roles: allRole;
}

const GetStarted: React.FC<IGetStartedProps> = ({ offices, roles }) => {
  const { dispatch } = useContext(AppContext);
  const [role, setRole] = useState<string>(roles[0].id);
  const [office, setOffice] = useState<string>(offices[0].id);

  const i18n = useLang();
  const router = useRouter();

  const onClickGetStartedNextPage = () => {
    if (role && office) {
      dispatch({
        payload: { checked: true, value: 'get-started' },
        type: Types.UPDATE_STEP,
      });
    }

    router.push('skills-details');
  };

  return (
    <WelcomeContent>
      <WelcomeContent.Title>{i18n.get('get-started')}</WelcomeContent.Title>
      <WelcomeContent.Body>
        <GetStartedBody
          offices={offices}
          roles={roles}
          onChangeRole={setRole}
          onChangeOffice={setOffice}
        />
      </WelcomeContent.Body>
      <WelcomeContent.Footer>
        <ClayButton onClick={onClickGetStartedNextPage}>
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
