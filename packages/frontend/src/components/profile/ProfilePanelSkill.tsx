import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import ClayProgressBar from '@clayui/progress-bar';
import React from 'react';

type Skill = {
  id: string;
  knowledgeSkill: {
    name: string;
  };
  knowledgeMatriz?: {
    name: string;
  };
};

interface IProfilePanelSkillProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  skills: Skill[];
}

const ProfilePanelSkill: React.FC<IProfilePanelSkillProps> = ({
  skills = [],
  title,
}: IProfilePanelSkillProps) => {
  return (
    <ClayPanel
      collapsable
      defaultExpanded
      displayTitle={title}
      displayType="secondary"
      showCollapseIcon
    >
      <ClayPanel.Body>
        <ClayLayout.Row>
          {skills.map(
            ({ id, knowledgeMatriz, knowledgeSkill: { name: skillName } }) => (
              <ClayLayout.Col key={id} size={4}>
                <ClayCard className="p-2">
                  <p className="font-weight-bold text-black">{skillName}</p>
                  {knowledgeMatriz && (
                    <>
                      <span>{knowledgeMatriz.name}</span>
                      <ClayProgressBar value={20} />
                    </>
                  )}
                </ClayCard>
              </ClayLayout.Col>
            ),
          )}
        </ClayLayout.Row>
      </ClayPanel.Body>
    </ClayPanel>
  );
};

export default ProfilePanelSkill;
