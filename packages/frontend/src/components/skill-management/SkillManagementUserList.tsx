import { ClayButtonWithIcon } from '@clayui/button';
import ClayForm, { ClayCheckbox, ClayInput, ClaySelect } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import React, { useContext } from 'react';

import useLang from '../../hooks/useLang';
import { Types } from '../../types';
import SkillContext from './SkillContext';

const SkillList: React.FC<any> = () => {
  const i18n = useLang();
  const {
    dispatch,
    state: { knowledgeMatriz, selectedSkills },
  } = useContext(SkillContext);

  const handleRemoveSkill = ({ id }) => {
    const newSelectedSkills = selectedSkills.filter((skill) => skill.id !== id);
    dispatch({ payload: newSelectedSkills, type: Types.EDIT_SELECTED_SKILLS });
  };

  if (!selectedSkills.length) {
    return <></>;
  }

  return (
    <div className="skill-list">
      {selectedSkills.map((skill) => (
        <div key={skill.id} className="skill-list__item">
          <ClayLayout.Row>
            <ClayLayout.Col size={5}>
              <ClayForm.Group>
                <label htmlFor="basicInputText">Name</label>
                <ClayInput readOnly value={skill.name} type="text" />
              </ClayForm.Group>
            </ClayLayout.Col>
            <ClayLayout.Col size={5}>
              <ClayForm.Group>
                <label htmlFor="basicInputText">{i18n.get('level')}</label>
                <ClaySelect aria-label="Select Label">
                  {knowledgeMatriz.map(({ id, name }) => (
                    <ClaySelect.Option key={id} label={name} value={id} />
                  ))}
                </ClaySelect>
              </ClayForm.Group>
            </ClayLayout.Col>
            <ClayLayout.Col size={2} className="skill-list__remove">
              <ClayButtonWithIcon
                color="gray"
                displayType="secondary"
                symbol="trash"
                onClick={() => handleRemoveSkill(skill)}
              />
            </ClayLayout.Col>
          </ClayLayout.Row>
          <ClayLayout.Row>
            <ClayLayout.Col>
              <ClayCheckbox
                onChange={() => {}}
                value={skill.isMentor}
                aria-label="Option 1"
                label={i18n.get('i-feel-comfortable-with-being-a-mentor')}
              />
            </ClayLayout.Col>
          </ClayLayout.Row>
        </div>
      ))}
    </div>
  );
};

export default SkillList;
