import React, { useCallback, useContext, useState } from 'react';

import DropDownTabs from '@/components/drop-down/DropDownTabs';
import useLang from '@/hooks/useLang';
import { BasicQuery, Types } from '@/types';

import SkillContext from './SkillContext';
import SkillManagementBars from './SkillManagementBars';
import SkillManagementSearch from './SkillManagementSearch';
import SkillManagementUserList from './SkillManagementUserList';

const DEFAULT_PAGE_SIZE = 9;

const SkillManagement: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const [selectedTab, setSelectedTab] = useState('all');
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const {
    dispatch,
    state: {
      knowledgeArea,
      knowledgeMatriz,
      knowledgeMatrizLevelAllowed,
      search,
      selectedSkills,
    },
  } = useContext(SkillContext);

  const firstMatriz = knowledgeMatriz.find(
    ({ matrizLevel }) => matrizLevel === 1,
  );

  const allSkills = knowledgeArea.map(({ skills }) => skills).flat();

  const getKnowledgeSkills = useCallback(() => {
    let skills = [];
    if (selectedTab === 'all') {
      skills = allSkills;
    } else {
      skills = knowledgeArea
        .filter(({ id }) => selectedTab === id)
        .map(({ skills }) => skills)
        .flat();
    }

    const filteredSkills = skills
      .filter(
        ({ id }) =>
          !selectedSkills.find((selected) => selected.knowledgeSkillId === id),
      )
      .filter((skill) =>
        skill.name.toLowerCase().includes(search.toLocaleLowerCase()),
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    const paginatedSkills = filteredSkills.slice(0, pageSize);

    return [filteredSkills, paginatedSkills];
  }, [knowledgeArea, selectedTab, selectedSkills, search, pageSize]);

  const handleClickSkill = (skill: BasicQuery) => {
    let skillPayload: any = {
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

  const handleClickTab = (tab: { id: string }) => {
    setSelectedTab(tab.id);
    setPageSize(DEFAULT_PAGE_SIZE);
  };

  const tabs = [
    { id: 'all', label: i18n.sub('all-x', allSkills.length.toString()) },
    ...knowledgeArea.map((area) => ({ id: area.id, label: area.name })),
  ];

  const [filteredSkills, paginatedSkills] = getKnowledgeSkills();

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
