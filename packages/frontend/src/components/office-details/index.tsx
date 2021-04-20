import ClayDropDown, { Align } from '@clayui/drop-down';
import ClayForm, { ClayCheckbox, ClaySelect } from '@clayui/form';
import React, { Dispatch, useState } from 'react';

import CustomSelect from '@/components/custom-select';
import useLang from '@/hooks/useLang';
import { BasicQuery, GrowMapOfficeInput, Office, Team } from '@/types';

const SelectOptions = ({ options }) => {
  const i18n = useLang();

  return (
    <>
      <option value="">{i18n.get('choose-an-option')}</option>
      {options.map((option) => (
        <ClaySelect.Option
          label={option.name}
          key={option.id}
          value={option.id}
        />
      ))}
    </>
  );
};

type IOfficeDetailBodyProps = {
  teams: Team[];
  departments: BasicQuery[];
  offices: Office[];
  roles: BasicQuery[];
  form: GrowMapOfficeInput;
  setForm: Dispatch<GrowMapOfficeInput>;
};

const OfficeDetailBody: React.FC<IOfficeDetailBodyProps> = ({
  departments,
  form,
  offices,
  roles,
  setForm,
  teams,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const i18n = useLang();

  const onChangeCheckbox = (event, { id }) => {
    const _selectedTeams = [...form.teamsId];

    if (event.target.checked) {
      _selectedTeams.push(id);
    } else {
      _selectedTeams.splice(_selectedTeams.map((id) => id).indexOf(id), 1);
    }

    setForm({
      ...form,
      teamsId: _selectedTeams,
    });
  };

  const onChangeSelect = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <ClayForm>
      <ClayForm.Group>
        <label htmlFor="department">{i18n.get('department')}</label>

        <ClaySelect
          name="departmentId"
          value={form.departmentId}
          onChange={onChangeSelect}
        >
          <SelectOptions options={departments} />
        </ClaySelect>
      </ClayForm.Group>

      <ClayForm.Group>
        <label htmlFor="office">{i18n.get('office')}</label>

        <ClaySelect
          name="officeId"
          value={form.officeId}
          onChange={onChangeSelect}
        >
          <SelectOptions options={offices} />
        </ClaySelect>
      </ClayForm.Group>

      <ClayForm.Group>
        <label htmlFor="role">{i18n.get('role')}</label>

        <ClaySelect name="roleId" value={form.roleId} onChange={onChangeSelect}>
          <SelectOptions options={roles} />
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
                form.teamsId.length
                  ? teams
                      .filter(({ id }) => form.teamsId.includes(id))
                      .map(({ name }) => name)
                      .join(', ')
                  : i18n.get('choose-an-option')
              }
            />
          }
        >
          {teams.map((team) => {
            return (
              <ClayDropDown.Item key={team.id}>
                <ClayCheckbox
                  checked={!!form.teamsId.find((id) => id === team.id)}
                  label={team.name}
                  onChange={(event) => onChangeCheckbox(event, team)}
                />
              </ClayDropDown.Item>
            );
          })}
        </ClayDropDown>
      </ClayForm.Group>
    </ClayForm>
  );
};

export default OfficeDetailBody;
