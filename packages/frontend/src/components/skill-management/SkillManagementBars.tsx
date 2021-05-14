import { useMutation } from '@apollo/client';
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput, ClaySelect } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayLayout from '@clayui/layout';
import { useModal } from '@clayui/modal';
import { ClayTooltipProvider } from '@clayui/tooltip';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import Panel from '@/components/panel';
import { CreateKnowledgeSkill } from '@/graphql/mutations';
import useLang from '@/hooks/useLang';
import { KnowledgeMatriz, KnowledgeMatrizAverage, Skill, Types } from '@/types';

import Modal from '../modal';
import SkillContext from './SkillContext';

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

const AddMoreSkillsComponent = () => {
  const i18n = useLang();

  const {
    dispatch,
    state: { knowledgeArea, knowledgeMatriz, search },
  } = useContext(SkillContext);

  const [onCreateKnowledgeSkill] = useMutation(CreateKnowledgeSkill);

  const [knowledgeSkill, setKnowledgeSkill] = useState({
    area: '',
    description: '',
    name: search,
  });

  const [visible, setVisible] = useState(false);

  const onToggle = () => {
    if (!visible) {
      setKnowledgeSkill({
        ...knowledgeSkill,
        name: search,
      });
    }

    setVisible(!visible);
  };

  const { observer, onClose } = useModal({
    onClose: onToggle,
  });

  const onChange = ({ target: { name, value } }) => {
    setKnowledgeSkill({
      ...knowledgeSkill,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    if (knowledgeSkill.name && knowledgeSkill.area) {
      const { data } = await onCreateKnowledgeSkill({
        variables: {
          data: knowledgeSkill,
        },
      });

      const skillResponse: Skill = data?.createKnowledgeSkill || {};

      if (skillResponse.id) {
        const newKnowledgeAreas = knowledgeArea.map((area) => {
          return {
            ...area,
            skills:
              area.id === knowledgeSkill.area
                ? [...area.skills, skillResponse]
                : area.skills,
          };
        });

        toast.info(i18n.get('your-request-completed-successfully'));

        dispatch({
          payload: {
            area: newKnowledgeAreas,
            matriz: knowledgeMatriz,
          },
          type: Types.EDIT_KNOWLEDGE_DATA,
        });

        onClose();
      }
    }
  };

  return (
    <>
      <ClayButton
        onClick={onToggle}
        displayType="link"
        className="skill-management__btn-add-skill"
      >
        {i18n.get('add-new-skill')}
      </ClayButton>

      <Modal
        last={
          <>
            <ClayButton
              className="mr-3"
              displayType="secondary"
              onClick={onClose}
            >
              {i18n.get('cancel')}
            </ClayButton>
            <ClayButton
              onClick={onSubmit}
              disabled={!knowledgeSkill.name || !knowledgeSkill.area}
              displayType="primary"
            >
              {i18n.get('save')}
            </ClayButton>
          </>
        }
        title={i18n.get('add-new-skill')}
        observer={observer}
        visible={visible}
      >
        <ClayForm.Group>
          <label>{i18n.get('skill-name')}</label>
          <ClayInput
            name="name"
            onChange={onChange}
            value={knowledgeSkill.name}
          />
        </ClayForm.Group>
        <ClayForm.Group>
          <label>{i18n.get('skill-description')}</label>
          <ClayInput
            name="description"
            onChange={onChange}
            value={knowledgeSkill.description}
          />
        </ClayForm.Group>
        <ClayForm.Group>
          <label>{i18n.get('category')}</label>
          <ClaySelect
            name="area"
            onChange={onChange}
            value={knowledgeSkill.area}
          >
            <ClaySelect.Option label={i18n.get('choose-an-option')} value="" />
            {knowledgeArea.map(({ id, name }) => (
              <ClaySelect.Option key={id} label={name} value={id} />
            ))}
          </ClaySelect>
        </ClayForm.Group>
      </Modal>
    </>
  );
};

const SkillComponent: React.FC<React.HTMLAttributes<HTMLElement>> & {
  Footer: typeof SkillFooter;
  List: typeof SkillList;
  Results: typeof SkillResults;
  ListAverage: typeof SkillListWithAverage;
} = ({ children }) => <div className="mt-3">{children}</div>;

const SkillList: React.FC<SkillListProps> = ({ filteredSkills, onClick }) => (
  <ClayTooltipProvider>
    <div>
      {filteredSkills.map((skill) => (
        <ClayButton
          key={skill.id}
          data-tooltip-align="bottom"
          data-tooltip-delay={200}
          displayType="secondary"
          title={skill.description}
          className="skill"
          onClick={() => onClick(skill)}
        >
          <span>
            {skill.name} <ClayIcon symbol="plus" className="ml-1" />
          </span>
        </ClayButton>
      ))}
    </div>
  </ClayTooltipProvider>
);

const SkillResults: React.FC<SkillResultsFooter> = ({
  filteredSkills,
  showAdd = true,
}) => {
  const i18n = useLang();

  const {
    state: { knowledgeSkills, search },
  } = useContext(SkillContext);

  const skillExist = knowledgeSkills.find(
    ({ name }) => name.toLowerCase() === search.toLowerCase(),
  );

  return (
    <div className="d-flex align-items-center">
      {filteredSkills.length === 0 && search && !skillExist && (
        <span>{i18n.sub('no-results-for-x', search)}</span>
      )}
      {showAdd && !skillExist && <AddMoreSkillsComponent />}
    </div>
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
  const getAverage = ({ id }): [number, string] => {
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
          <Panel.Item key={index} onClick={() => handleClickSkill(skill)}>
            <Panel.Title>{skill.name}</Panel.Title>
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
