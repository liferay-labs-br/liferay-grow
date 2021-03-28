import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayLayout from '@clayui/layout';
import React, { useContext } from 'react';

import Panel from '@/components/panel';
import useLang from '@/hooks/useLang';
import { KnowledgeMatriz, KnowledgeMatrizAverage, Skill } from '@/types';

import SkillContext from './SkillContext';

type ISkillInfoProps = {
  onClick: (skill: Skill) => void;
  skill: Skill;
};

type SkillListProps = {
  onClick: (skill: Skill) => void;
  filteredSkills: Skill[];
  loading?: boolean;
  visualization?: 'card' | 'panel';
};

type SkillFooterProps = {
  filteredSkills: Skill[];
  moreSkills: boolean;
  handleMoreSkills: () => void;
};

type SkillResultsFooter = {
  filteredSkills: Skill[];
  showAdd?: boolean;
};

type SkillListWithAverageProps = {
  handleClickSkill: (skill: Skill) => void;
  knowledgeMatriz: KnowledgeMatriz[];
  knowledgeMatrizAverage: KnowledgeMatrizAverage[];
  skills: Skill[];
};

const SkillComponent: React.FC<React.HTMLAttributes<HTMLElement>> & {
  Footer: React.ElementType;
  List: React.ElementType;
  Results: React.ElementType;
  ListAverage: React.ElementType;
} = ({ children }) => <div className="mt-3">{children}</div>;

const SkillInfo: React.FC<ISkillInfoProps> = ({ onClick, skill }) => (
  <ClayButton
    displayType="secondary"
    className="skill"
    onClick={() => onClick(skill)}
  >
    {skill.name} <ClayIcon symbol="plus" className="ml-1" />
  </ClayButton>
);

const SkillList: React.FC<SkillListProps> = ({ filteredSkills, onClick }) => (
  <>
    {filteredSkills.map((skill) => (
      <SkillInfo key={skill.id} skill={skill} onClick={onClick} />
    ))}
  </>
);

const SkillResults: React.FC<SkillResultsFooter> = ({
  filteredSkills,
  showAdd = true,
}) => {
  const i18n = useLang();

  const {
    state: { search },
  } = useContext(SkillContext);

  return (
    <>
      {filteredSkills.length === 0 && search && (
        <div className="d-flex align-items-center">
          <span>{i18n.sub('no-results-for-x', search)}</span>
          {showAdd && (
            <ClayButton
              displayType="link"
              className="skill-management__btn-add-skill"
            >
              {i18n.get('add-more-skills')}
            </ClayButton>
          )}
        </div>
      )}
    </>
  );
};

const SkillFooter: React.FC<SkillFooterProps> = ({
  filteredSkills,
  handleMoreSkills,
  moreSkills,
}) => {
  const i18n = useLang();

  if (filteredSkills.length > 0 && moreSkills) {
    return (
      <ClayButton
        displayType="link"
        className="skill-management__btn-more"
        onClick={() => handleMoreSkills()}
      >
        {i18n.get('more-skills')}
      </ClayButton>
    );
  }

  return null;
};

const SkillListWithAverage: React.FC<SkillListWithAverageProps> = ({
  handleClickSkill,
  knowledgeMatriz,
  knowledgeMatrizAverage,
  skills,
}) => {
  const getAverage = ({ id }) => {
    const matrizAverage = knowledgeMatrizAverage.find(
      (matriz) => matriz.id === id,
    );

    const matrizLevelAvg = Math.ceil(
      Number(matrizAverage?.matrizLevelAvg) || 1,
    );

    const matrizName = knowledgeMatriz.find(
      ({ matrizLevel }) => matrizLevel === matrizLevelAvg,
    )?.name;

    return [matrizLevelAvg, matrizName];
  };

  return (
    <ClayLayout.Row>
      {skills.map((skill, index) => {
        const [matrizLevelAvg, matrizName] = getAverage(skill);

        return (
          <Panel.Item key={index}>
            <Panel.Title
              className="link"
              onClick={() => handleClickSkill(skill)}
            >
              {skill.name}
            </Panel.Title>
            <Panel.Body>
              <span>{matrizName}</span>
            </Panel.Body>
            <Panel.ProgressBar partialValue={matrizLevelAvg} />
          </Panel.Item>
        );
      })}
    </ClayLayout.Row>
  );
};

SkillComponent.List = SkillList;
SkillComponent.Results = SkillResults;
SkillComponent.Footer = SkillFooter;
SkillComponent.ListAverage = SkillListWithAverage;

export default SkillComponent;
