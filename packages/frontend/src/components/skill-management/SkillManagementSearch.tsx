import { ClayButtonWithIcon } from '@clayui/button';
import { ClayInput } from '@clayui/form';
import React, { useContext } from 'react';

import useLang from '../../hooks/useLang';
import SkillContext from './SkillContext';
import { Types } from './SkillReducer';

const SkillManagementSearch: React.FC<any> = () => {
  const i18n = useLang();
  const {
    dispatch,
    state: { search },
  } = useContext(SkillContext);

  const editSearch = (value) => {
    dispatch({
      payload: value,
      type: Types.EDIT_SEARCH,
    });
  };

  return (
    <ClayInput.Group>
      <ClayInput.GroupItem>
        <ClayInput
          aria-label="Search"
          className="form-control input-group-inset input-group-inset-after"
          placeholder={i18n.get('skills-details')}
          type="text"
          value={search}
          onChange={(e) => editSearch(e.target.value)}
        />
        <ClayInput.GroupInsetItem after tag="span">
          <ClayButtonWithIcon
            displayType="unstyled"
            symbol={search ? 'times' : 'search'}
            onClick={() => (search ? editSearch('') : null)}
            type="button"
          />
        </ClayInput.GroupInsetItem>
      </ClayInput.GroupItem>
    </ClayInput.Group>
  );
};

export default SkillManagementSearch;
