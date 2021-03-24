import { useRouter } from 'next/router';
import React from 'react';

import DropDownTabs from '@/components/drop-down/DropDownTabs';
import Meta from '@/components/meta';
import SkillContextProvider from '@/components/skill-management/SkillContextProvider';
import SkillManagementBars from '@/components/skill-management/SkillManagementBars';
import SkillManagementSearch from '@/components/skill-management/SkillManagementSearch';
import useSkillManagement from '@/components/skill-management/useSkillManagement';
import HomeTemplate from '@/components/templates/HomeTemplate';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { Skill } from '@/types';

const KnowledgeAreaManagement: React.FC<
  React.HTMLAttributes<HTMLElement>
> = () => {
  const router = useRouter();

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

  const handleClickSkill = ({ slug }: Skill) => {
    router.push(`/skill/${slug}`);
  };

  return (
    <div className="skill-management">
      <SkillManagementSearch />

      <SkillManagementBars>
        <DropDownTabs tabs={tabs} onClick={handleClickTab} offset={5}>
          <SkillManagementBars.List
            visualization="panel"
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
    </div>
  );
};

const KnowledgeArea: React.FC = () => {
  const i18n = useLang();

  return (
    <SkillContextProvider>
      <HomeTemplate>
        <Meta title={i18n.sub('app-title-x', 'knowledge-areas')} />
        <h1>{i18n.get('knowledge-areas')}</h1>
        <KnowledgeAreaManagement />
      </HomeTemplate>
    </SkillContextProvider>
  );
};

export default withAuth(KnowledgeArea);
