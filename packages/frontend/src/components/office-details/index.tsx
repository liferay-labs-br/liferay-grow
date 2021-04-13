import ClayDropDown, { Align } from '@clayui/drop-down';
import ClayForm, { ClayCheckbox, ClaySelect } from '@clayui/form';
import React, { Dispatch, SetStateAction, useState } from 'react';

import CustomSelect from '@/components/custom-select';
import useLang from '@/hooks/useLang';
import { BasicQuery, Office, Team } from '@/types';

type BaseSelect = {
  id?: string;
  name?: string;
};

interface IOfficeDetailBodyProps extends React.HTMLAttributes<HTMLElement> {
  teams: Team[];
  offices: Office[];
  roles: BasicQuery[];
  selectedOffice: BaseSelect;
  selectedRole: BaseSelect;
  selectedTeams: BasicQuery[];
  setSelectedOffice: Dispatch<SetStateAction<BasicQuery>>;
  setSelectedRole: Dispatch<SetStateAction<BasicQuery>>;
  setSelectedTeams: Dispatch<SetStateAction<BasicQuery[]>>;
}

const OfficeDetailBody: React.FC<IOfficeDetailBodyProps> = ({
  offices,
  roles,
  selectedOffice,
  selectedRole,
  selectedTeams,
  setSelectedOffice,
  setSelectedRole,
  setSelectedTeams,
  teams,
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
        <label htmlFor="office">{i18n.get('office')}</label>

        <ClaySelect
          value={selectedOffice.id}
          onChange={({ target: { selectedOptions, value } }) => {
            setSelectedOffice({
              id: value,
              name: selectedOptions[0].textContent,
            });
          }}
        >
          <option value="">{i18n.get('choose-an-option')}</option>
          {offices.map((roles) => (
            <ClaySelect.Option
              label={roles.name}
              key={roles.id}
              value={roles.id}
            />
          ))}
        </ClaySelect>
      </ClayForm.Group>

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
          {teams.map((team) => {
            return (
              <ClayDropDown.Item key={team.id}>
                <ClayCheckbox
                  checked={!!selectedTeams.find(({ id }) => id === team.id)}
                  label={team.name}
                  onChange={(event) => onChangeCheckbox(event, team)}
                />
              </ClayDropDown.Item>
            );
          })}
        </ClayDropDown>
      </ClayForm.Group>

      <ClayForm.Group>
        <label htmlFor="role">{i18n.get('role')}</label>

        <ClaySelect
          value={selectedRole.id}
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
              value={roles.id}
            />
          ))}
        </ClaySelect>
      </ClayForm.Group>
    </ClayForm>
  );
};

export default OfficeDetailBody;
