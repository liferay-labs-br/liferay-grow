import { ClayButtonWithIcon } from '@clayui/button';
import ClayDropDown, { Align } from '@clayui/drop-down';
import ClayForm, { ClayCheckbox, ClayInput } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import React, { Dispatch, useCallback, useContext, useState } from 'react';

import useLang from '@/hooks/useLang';
import { SelectedSkills, Types } from '@/types';

import CustomSelect from '../../components/CustomSelect';
import SkillContext from './SkillContext';

const SkillMatrizThreshold = 2;

type SkillForm = {
  skill: SelectedSkills;
};

const dispatchChangeOnRow = ({
  dispatch,
  selectedSkills,
}: {
  dispatch: Dispatch<any>;
  selectedSkills: SelectedSkills[];
}) => ({ name, value }, skill: SelectedSkills) => {
  const updatedSelectedSkill = selectedSkills.map((selectedSkill) => {
    if (selectedSkill.knowledgeSkillId === skill.knowledgeSkillId) {
      return {
        ...selectedSkill,
        [name]: value,
      };
    }

    return selectedSkill;
  });

  dispatch({
    payload: updatedSelectedSkill,
    type: Types.EDIT_SELECTED_SKILLS,
  });
};

const SkillNameForm = ({ name }: { name: string }) => {
  const i18n = useLang();

  return (
    <ClayLayout.Col>
      <ClayForm.Group>
        <label>{i18n.get('skill')}</label>
        <ClayInput readOnly value={name || ''} type="text" />
      </ClayForm.Group>
    </ClayLayout.Col>
  );
};

const SkillMatrizForm: React.FC<SkillForm> = ({ skill }) => {
  const [active, setActive] = useState(false);
  const i18n = useLang();

  const {
    dispatch,
    state: { knowledgeMatriz, knowledgeMatrizLevelAllowed, selectedSkills },
  } = useContext(SkillContext);

  const [selectedLevel, setSelectedLevel] = useState(
    knowledgeMatriz.find(({ id }) => id === skill.knowledgeMatrizId)?.name,
  );

  const onChangeRow = dispatchChangeOnRow({ dispatch, selectedSkills });

  if (!knowledgeMatrizLevelAllowed) {
    return null;
  }

  return (
    <ClayLayout.Col size={5}>
      <ClayForm.Group>
        <label>{i18n.get('level')}</label>

        <ClayDropDown
          active={active}
          alignmentPosition={Align.BottomLeft}
          onActiveChange={(newVal) => setActive(newVal)}
          trigger={<CustomSelect value={selectedLevel} />}
        >
          <ClayDropDown.ItemList>
            {knowledgeMatriz.map(({ description, id, name }) => (
              <ClayDropDown.Item
                key={id}
                onClick={() => {
                  onChangeRow({ name: 'knowledgeMatrizId', value: id }, skill);
                  setSelectedLevel(name);
                  setActive(false);
                }}
              >
                <div>{name}</div>
                <small className="text-secondary">{description}</small>
              </ClayDropDown.Item>
            ))}
          </ClayDropDown.ItemList>
        </ClayDropDown>
      </ClayForm.Group>
    </ClayLayout.Col>
  );
};

const SkillRemove: React.FC<SkillForm> = ({ skill }) => {
  const {
    dispatch,
    state: { selectedSkills },
  } = useContext(SkillContext);

  const { knowledgeSkillId } = skill;

  const handleRemoveSkill = () => {
    dispatch({
      payload: selectedSkills.filter(
        (skill) => skill.knowledgeSkillId !== knowledgeSkillId,
      ),
      type: Types.EDIT_SELECTED_SKILLS,
    });
  };

  return (
    <ClayLayout.Col size={2} className="skill-list__remove">
      <ClayButtonWithIcon
        color="gray"
        displayType="secondary"
        symbol="trash"
        onClick={handleRemoveSkill}
      />
    </ClayLayout.Col>
  );
};

const SkillMentor: React.FC<SkillForm> = ({ skill }) => {
  const i18n = useLang();

  const {
    dispatch,
    state: { knowledgeMatriz, selectedSkills },
  } = useContext(SkillContext);

  const onChangeRow = dispatchChangeOnRow({ dispatch, selectedSkills });

  const knowledgeMatrizInThreshold = knowledgeMatriz
    .filter(({ matrizLevel }) => matrizLevel > SkillMatrizThreshold)
    .map(({ id }) => id);

  if (!knowledgeMatrizInThreshold.includes(skill.knowledgeMatrizId)) {
    return null;
  }

  return (
    <ClayLayout.Row>
      <ClayLayout.Col>
        <ClayCheckbox
          checked={skill.isMentor}
          onChange={() =>
            onChangeRow(
              {
                name: 'isMentor',
                value: !skill.isMentor,
              },
              skill,
            )
          }
          label={i18n.get('i-feel-comfortable-with-being-a-mentor')}
        />
      </ClayLayout.Col>
    </ClayLayout.Row>
  );
};

const SkillForm = ({ children }) => (
  <div className="skill-list__item">{children}</div>
);

SkillForm.SkillName = SkillNameForm;
SkillForm.SkillMatriz = SkillMatrizForm;
SkillForm.SkillRemove = SkillRemove;
SkillForm.SkillMentor = SkillMentor;

const SkillList: React.FC = () => {
  const {
    state: { knowledgeSkills, selectedSkills },
  } = useContext(SkillContext);

  const getSkillNameById = useCallback(
    (skillId) => knowledgeSkills.find((skill) => skill.id === skillId)?.name,
    [knowledgeSkills],
  );

  if (!selectedSkills.length) {
    return null;
  }

  return (
    <div className="skill-list">
      {selectedSkills.map((skill) => (
        <div key={skill.knowledgeSkillId} className="skill-list__item">
          <ClayLayout.Row>
            <SkillForm.SkillName
              name={getSkillNameById(skill.knowledgeSkillId)}
            />
            <SkillForm.SkillMatriz skill={skill} />
            <SkillForm.SkillRemove skill={skill} />
          </ClayLayout.Row>

          <SkillForm.SkillMentor skill={skill} />
        </div>
      ))}
    </div>
  );
};

export default SkillList;
