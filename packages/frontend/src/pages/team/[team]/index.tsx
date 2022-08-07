import { useRouter } from 'next/router';
import React from 'react';

import DropDownTabs from '@/components/drop-down/DropDownTabs';
import EmptyState from '@/components/empty-state';
import Meta from '@/components/meta';
import SkillContextProvider from '@/components/skill-management/SkillContextProvider';
import SkillManagementBars from '@/components/skill-management/SkillManagementBars';
import SkillManagementSearch from '@/components/skill-management/SkillManagementSearch';
import useSkillManagement from '@/components/skill-management/useSkillManagement';
import TeamTemplate from '@/components/templates/TeamTemplate';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { KnowledgeMatriz, KnowledgeMatrizAverage, Skill } from '@/types';
import { flat } from '@/utils/util';

type TeamSummaryManagementProps = {
  knowledgeMatrizAverage: KnowledgeMatrizAverage[];
  knowledgeMatriz: KnowledgeMatriz[];
};

const TeamSummaryManagement: React.FC<TeamSummaryManagementProps> = ({
  knowledgeMatriz,
  knowledgeMatrizAverage,
}) => {
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
          <SkillManagementBars.ListAverage
            skills={paginatedSkills}
            knowledgeMatriz={knowledgeMatriz}
            knowledgeMatrizAverage={knowledgeMatrizAverage}
            handleClickSkill={handleClickSkill}
          />
        </DropDownTabs>
        <SkillManagementBars.Results
          filteredSkills={paginatedSkills}
          showAdd={false}
        />
        <SkillManagementBars.Footer
          moreSkills={filteredSkills.length > paginatedSkills.length}
          filteredSkills={paginatedSkills}
          handleMoreSkills={() => setPageSize(pageSize + DEFAULT_PAGE_SIZE)}
        />
      </SkillManagementBars>
    </div>
  );
};

const TeamSummary = () => {
  const i18n = useLang();

  return (
    <TeamTemplate page="summary">
      {({
        data: {
          getAllKnowledgeMatriz,
          getTeamBySlug: { knowledgeArea, knowledgeMatrizAverage },
        },
      }) => (
        <SkillContextProvider
          fetchData={false}
          defaultState={{
            knowledgeArea,
            knowledgeSkills: flat(knowledgeArea.map(({ skills }) => skills)),
          }}
        >
          <Meta title={i18n.sub('app-title-x', 'knowledge-areas')} />
          {knowledgeArea.length ? (
            <>
              <h1>{i18n.get('knowledge-areas')}</h1>
              <TeamSummaryManagement
                knowledgeMatriz={getAllKnowledgeMatriz.rows}
                knowledgeMatrizAverage={knowledgeMatrizAverage}
              />
            </>
          ) : (
            <EmptyState
              description={i18n.get('there-are-no-knowledge-area-yet')}
            />
          )}
        </SkillContextProvider>
      )}
    </TeamTemplate>
  );
};

export default withAuth(TeamSummary);
