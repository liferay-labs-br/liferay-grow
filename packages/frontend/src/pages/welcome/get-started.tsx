import ClayButton from '@clayui/button';
import ClayDropDown, { Align } from '@clayui/drop-down';
import ClayForm, { ClayCheckbox, ClaySelect } from '@clayui/form';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

import AppContext from '../../AppContext';
import CustomSelect from '../../components/CustomSelect';
import WelcomeContent from '../../components/welcome/WelcomeContent';
import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { getStarted } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';
import { allOffice, BasicQuery, Types } from '../../types';
import ROUTES from '../../utils/routes';

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

interface IGetStartedBodyProps extends React.HTMLAttributes<HTMLElement> {
  offices: allOffice[];
  roles: BasicQuery[];
  selectedRole: SelectedRole;
  selectedTeams: BasicQuery[];
  setSelectedRole: Dispatch<SetStateAction<BasicQuery>>;
  setSelectedTeams: Dispatch<SetStateAction<BasicQuery[]>>;
}

const GetStartedBody: React.FC<IGetStartedBodyProps> = ({
  offices,
  roles,
  selectedRole,
  selectedTeams,
  setSelectedRole,
  setSelectedTeams,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const i18n = useLang();

  const onChangeCheckbox = (event, { id, name }) => {
    const _selectedTeams = [...selectedTeams];

    if (event.target.checked) {
      _selectedTeams.push({ id, name });
    } else {
      _selectedTeams.splice(_selectedTeams.map(({ id }) => id).indexOf(id), 1);
    }

    setSelectedTeams(_selectedTeams);
  };

  return (
    <ClayForm>
      <ClayForm.Group>
        <label htmlFor="team">{i18n.get('team')}</label>

        <ClayDropDown
          active={active}
          alignmentPosition={Align.BottomLeft}
          onActiveChange={(newVal) => setActive(newVal)}
          trigger={
            <CustomSelect
              value={
                selectedTeams.length
                  ? selectedTeams.map(({ name }) => name).join(', ')
                  : i18n.get('choose-an-option')
              }
            />
          }
        >
          <ClayDropDown.ItemList>
            {offices.map((office) => (
              <ClayDropDown.Group header={office.name} key={office.id}>
                {office.teams.map((team) => {
                  return (
                    <ClayDropDown.Item key={team.id}>
                      <ClayCheckbox
                        checked={
                          !!selectedTeams.find(({ id }) => id === team.id)
                        }
                        label={team.name}
                        onChange={(event) => onChangeCheckbox(event, team)}
                      />
                    </ClayDropDown.Item>
                  );
                })}
              </ClayDropDown.Group>
            ))}
          </ClayDropDown.ItemList>
        </ClayDropDown>
      </ClayForm.Group>

      <ClayForm.Group>
        <label htmlFor="role">{i18n.get('role')}</label>

        <ClaySelect
          onChange={({ target: { selectedOptions, value } }) => {
            setSelectedRole({
              id: value,
              name: selectedOptions[0].textContent,
            });
          }}
        >
          <option value="">{i18n.get('choose-an-option')}</option>
          {roles.map((roles) => (
            <ClaySelect.Option
              label={roles.name}
              key={roles.id}
              // It is a warning in react, but we can't set a
              // defaultValue without using selected param
              selected={roles.id === selectedRole.id}
              value={roles.id}
            />
          ))}
        </ClaySelect>
      </ClayForm.Group>
    </ClayForm>
  );
};

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
        <GetStartedBody
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
