import React, { useContext } from 'react';

import { Skill, Types } from '../../types';
import SkillContext from './SkillContext';
import SkillManagementBars from './SkillManagementBars';
import SkillManagementSearch from './SkillManagementSearch';
import SkillManagementUserList from './SkillManagementUserList';

const SkillManagement: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const {
    dispatch,
    state: { selectedSkills, skills, variables },
  } = useContext(SkillContext);

  const handleMoreSkills = (count = 10) => {
    dispatch({
      payload: { ...variables, pageSize: variables.pageSize + count },
      type: Types.EDIT_VARIABLES,
    });
  };

  const handleClickSkill = (skill: Skill) => {
    dispatch({
      payload: [...selectedSkills, skill],
      type: Types.EDIT_SELECTED_SKILLS,
    });

    handleMoreSkills(1);
  };

  const filteredSkills = skills.filter(
    (row) => !selectedSkills.find((selected) => selected.id === row.id),
  );

  return (
    <div className="skill-management">
      <SkillManagementSearch />

      <SkillManagementBars>
        <SkillManagementBars.List
          filteredSkills={filteredSkills}
          onClick={handleClickSkill}
        />
        <SkillManagementBars.Results filteredSkills={filteredSkills} />
        <SkillManagementBars.Footer
          filteredSkills={filteredSkills}
          handleMoreSkills={handleMoreSkills}
        />
      </SkillManagementBars>

      <SkillManagementBars>
        <SkillManagementUserList />
      </SkillManagementBars>
    </div>
  );
};

export default SkillManagement;
