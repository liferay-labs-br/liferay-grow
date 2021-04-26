import React, { useContext } from 'react';

import DropDownTabs from '@/components/drop-down/DropDownTabs';
import { BasicQuery, Types } from '@/types';

import SkillContext from './SkillContext';
import SkillManagementBars from './SkillManagementBars';
import SkillManagementSearch from './SkillManagementSearch';
import SkillManagementUserList from './SkillManagementUserList';
import useSkillManagement from './useSkillManagement';

const SkillManagement: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const {
    fns: { handleClickTab, setPageSize },
    state: {
      DEFAULT_PAGE_SIZE,
      filteredSkills,
      pageSize,
      paginatedSkills,
      tabs,
    },
  } = useSkillManagement();

  const {
    dispatch,
    state: { knowledgeMatriz, knowledgeMatrizLevelAllowed, selectedSkills },
  } = useContext(SkillContext);

  const firstMatriz = knowledgeMatriz.find(
    ({ matrizLevel }) => matrizLevel === 1,
  );

  const handleClickSkill = (skill: BasicQuery) => {
    let skillPayload = {
      isMentor: false,
      knowledgeMatrizId: null,
      knowledgeSkillId: skill.id,
      name: skill.name,
    };

    if (knowledgeMatrizLevelAllowed) {
      skillPayload = {
        ...skillPayload,
        isMentor: false,
        knowledgeMatrizId: firstMatriz.id,
      };
    }

    dispatch({
      payload: [...selectedSkills, skillPayload],
      type: Types.EDIT_SELECTED_SKILLS,
    });

    setPageSize(pageSize);
  };

  return (
    <div className="skill-management">
      <SkillManagementSearch />

      <SkillManagementBars>
        <DropDownTabs tabs={tabs} onClick={handleClickTab} offset={5}>
          <SkillManagementBars.List
            filteredSkills={paginatedSkills}
            onClick={handleClickSkill}
          />
        </DropDownTabs>
        <SkillManagementBars.Results filteredSkills={paginatedSkills} />
        <SkillManagementBars.Footer
          moreSkills={filteredSkills.length > paginatedSkills.length}
          filteredSkills={paginatedSkills}
          handleMoreSkills={() => setPageSize(pageSize + DEFAULT_PAGE_SIZE)}
        />
      </SkillManagementBars>

      <SkillManagementBars>
        <SkillManagementUserList />
      </SkillManagementBars>
    </div>
  );
};

export default SkillManagement;
