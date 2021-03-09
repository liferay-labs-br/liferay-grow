import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayInput } from '@clayui/form';
import React, { useState } from 'react';

import useLang from '../../hooks/useLang';
import SkillComponent from './Skill';

export type Skill = {
  id: string;
  name: string;
};

type SkillManagementProps = {
  handleAddNewSkill: () => void;
  handleClickSkill: (skill: Skill) => void;
  handleMoreSkills: () => void;
  handleSearch: (search: string) => void;
  moreSkills: boolean;
  skills: Skill[];
};

const SkillManagement: React.FC<SkillManagementProps> = ({
  handleAddNewSkill,
  handleClickSkill,
  handleMoreSkills,
  handleSearch,
  moreSkills,
  skills,
}) => {
  const i18n = useLang();
  const [search, setSearch] = useState('');

  return (
    <div className="skill-management">
      <ClayInput.Group>
        <ClayInput.GroupItem>
          <ClayInput
            aria-label="Search"
            className="form-control input-group-inset input-group-inset-after"
            placeholder={i18n.get('skills-details')}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          <ClayInput.GroupInsetItem after tag="span">
            <ClayButtonWithIcon
              displayType="unstyled"
              symbol="search"
              type="submit"
            />
          </ClayInput.GroupInsetItem>
        </ClayInput.GroupItem>
      </ClayInput.Group>
      <div className="mt-3">
        {skills.map((skill) => (
          <SkillComponent
            key={skill.id}
            skill={skill}
            onClick={handleClickSkill}
          />
        ))}

        {skills.length === 0 && (
          <div className="d-flex align-items-center">
            <span>{`No results for "${search}"`}</span>
            <ClayButton
              displayType="link"
              className="skill-management__btn-add-skill"
              onClick={handleAddNewSkill}
            >
              Add New Skill
            </ClayButton>
          </div>
        )}

        {moreSkills && (
          <ClayButton
            displayType="link"
            className="skill-management__btn-more"
            onClick={handleMoreSkills}
          >
            More Skills
          </ClayButton>
        )}
      </div>
    </div>
  );
};

export default SkillManagement;
