import { useCallback, useContext, useState } from 'react';

import useLang from '@/hooks/useLang';
import { flat } from '@/utils/util';

import SkillContext from './SkillContext';

const DEFAULT_PAGE_SIZE = 9;

type Tab = {
  id: string;
  label: string;
};

type UseSkillManagementResponse = {
  fns: {
    handleClickTab: (tab: Tab) => void;
    setPageSize: (pageSize: number) => void;
  };
  state: {
    DEFAULT_PAGE_SIZE: number;
    filteredSkills: any[];
    pageSize: number;
    paginatedSkills: any[];
    tabs: Tab[];
  };
};

const useSkillManagement = (): UseSkillManagementResponse => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedTab, setSelectedTab] = useState('all');
  const i18n = useLang();

  const {
    state: { knowledgeArea, knowledgeSkills, search, selectedSkills },
  } = useContext(SkillContext);

  const handleClickTab = (tab: { id: string }) => {
    setSelectedTab(tab.id);
    setPageSize(DEFAULT_PAGE_SIZE);
  };

  const getKnowledgeSkills = useCallback(() => {
    let skills = [];
    if (selectedTab === 'all') {
      skills = knowledgeSkills;
    } else {
      skills = flat(
        knowledgeArea
          .filter(({ id }) => selectedTab === id)
          .map(({ skills }) => skills),
      );
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
  }, [
    knowledgeArea,
    knowledgeSkills,
    selectedTab,
    selectedSkills,
    search,
    pageSize,
  ]);

  const [filteredSkills, paginatedSkills] = getKnowledgeSkills();

  const tabs = [
    { id: 'all', label: i18n.sub('all-x', knowledgeSkills.length.toString()) },
    ...knowledgeArea.map((area) => ({ id: area.id, label: area.name })),
  ];

  return {
    fns: {
      handleClickTab,
      setPageSize,
    },
    state: {
      DEFAULT_PAGE_SIZE,
      filteredSkills,
      pageSize,
      paginatedSkills,
      tabs,
    },
  };
};

export default useSkillManagement;
