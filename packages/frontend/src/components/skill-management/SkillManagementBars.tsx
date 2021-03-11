import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import React, { useContext } from 'react';

import useLang from '../../hooks/useLang';
import { Skill } from '../../types';
import LoadingWrapper from '../loading';
import SkillContext from './SkillContext';

interface ISkillInfoProps extends React.HTMLAttributes<HTMLElement> {
  onClick: any;
  skill: Skill;
}

interface ISkillListProps extends React.HTMLAttributes<HTMLElement> {
  onClick: any;
  filteredSkills: Skill[];
  loading?: boolean;
}

interface ISkillFooterProps extends React.HTMLAttributes<HTMLElement> {
  filteredSkills: Skill[];
  handleMoreSkills: () => void;
}

interface ISkillResultsFooter extends React.HTMLAttributes<HTMLElement> {
  filteredSkills: Skill[];
}

const SkillComponent: React.FC<React.HTMLAttributes<HTMLElement>> & {
  Footer: React.ElementType;
  List: React.ElementType;
  Results: React.ElementType;
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

const SkillList: React.FC<ISkillListProps> = ({
  filteredSkills,
  loading,
  onClick,
}) => {
  if (loading) {
    return <LoadingWrapper />;
  }

  return (
    <>
      {filteredSkills.map((skill) => (
        <SkillInfo key={skill.id} skill={skill} onClick={onClick} />
      ))}
    </>
  );
};

const SkillResults: React.FC<ISkillResultsFooter> = ({ filteredSkills }) => {
  const i18n = useLang();

  const {
    state: { search },
  } = useContext(SkillContext);

  return (
    <>
      {filteredSkills.length === 0 && search && (
        <div className="d-flex align-items-center">
          <span>{i18n.sub('no-results-for-x', search)}</span>
          <ClayButton
            displayType="link"
            className="skill-management__btn-add-skill"
          >
            {i18n.get('add-more-skills')}
          </ClayButton>
        </div>
      )}
    </>
  );
};

const SkillFooter: React.FC<ISkillFooterProps> = ({
  filteredSkills,
  handleMoreSkills,
}) => {
  const i18n = useLang();

  const {
    state: { pagination },
  } = useContext(SkillContext);

  const moreSkills = pagination?.currentPage < pagination?.totalPages;

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

SkillComponent.List = SkillList;
SkillComponent.Results = SkillResults;
SkillComponent.Footer = SkillFooter;

export default SkillComponent;
