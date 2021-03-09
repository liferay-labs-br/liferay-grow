import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import React from 'react';

import { Skill } from './SkillManagement';

type SkillProps = {
  onClick: (skill: Skill) => void;
  skill: Skill;
};

const SkillComponent: React.FC<SkillProps> = ({ onClick, skill }) => {
  return (
    <ClayButton
      displayType="secondary"
      className="skill"
      onClick={() => onClick(skill)}
    >
      {skill.name} <ClayIcon symbol="plus" className="ml-1" />
    </ClayButton>
  );
};

export default SkillComponent;
