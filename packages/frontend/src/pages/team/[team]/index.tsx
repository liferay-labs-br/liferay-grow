import { ClayButtonWithIcon } from '@clayui/button';
import { ClayInput } from '@clayui/form';
import React from 'react';

import DropDownTabs from '@/components/drop-down/DropDownTabs';
import Panel from '@/components/panel';
import TeamTemplate from '@/components/templates/TeamTemplate';
import useLang from '@/hooks/useLang';

const Team: React.FC = () => {
  const i18n = useLang();

  const tabs = [
    { id: '1', label: 'All (63)' },
    { id: '2', label: 'frontend' },
    { id: '3', label: 'backend' },
    { id: '4', label: 'common skills' },
    { id: '5', label: 'communication' },
  ];

  const skills = [
    {
      knowledgeMatriz: {
        name: 'Beginner',
        partialValue: 1,
      },
      knowledgeSkill: {
        id: '1',
        name: 'Java 8',
      },
    },
    {
      knowledgeMatriz: {
        name: 'Apprentice',
        partialValue: 2,
      },
      knowledgeSkill: {
        id: '2',
        name: 'Angular',
      },
    },
    {
      knowledgeMatriz: {
        name: 'Practitioner',
        partialValue: 3,
      },
      knowledgeSkill: {
        id: '3',
        name: 'Javascript',
      },
    },
    {
      knowledgeMatriz: {
        name: 'Professional',
        partialValue: 4,
      },
      knowledgeSkill: {
        id: '4',
        name: 'Typescript',
      },
    },
    {
      knowledgeMatriz: {
        name: 'Teacher',
        partialValue: 5,
      },
      knowledgeSkill: {
        id: '5',
        name: 'Flutter',
      },
    },
    {
      knowledgeMatriz: {
        name: 'Leader',
        partialValue: 6,
      },
      knowledgeSkill: {
        id: '6',
        name: 'Dart',
      },
    },
    {
      knowledgeMatriz: {
        name: 'Master',
        partialValue: 7,
      },
      knowledgeSkill: {
        id: '6',
        name: 'Django',
      },
    },
  ];

  return (
    <TeamTemplate page="summary">
      <h1 className="mb-4">Knowledge Areas</h1>
      <div>
        <ClayInput.Group>
          <ClayInput.GroupItem>
            <ClayInput
              aria-label="Search"
              className="form-control input-group-inset input-group-inset-after"
              placeholder={i18n.get('search-skills')}
              type="text"
            />
            <ClayInput.GroupInsetItem after tag="span">
              <ClayButtonWithIcon
                displayType="unstyled"
                symbol={'search'}
                type="button"
              />
            </ClayInput.GroupInsetItem>
          </ClayInput.GroupItem>
        </ClayInput.Group>
        <DropDownTabs
          tabs={tabs}
          onClick={(value) => console.log(value)}
          offset={5}
        >
          <div className="d-flex row">
            {skills.map(({ knowledgeMatriz, knowledgeSkill }) => (
              <Panel.Item key={knowledgeSkill.id}>
                <Panel.Title>{knowledgeSkill.name}</Panel.Title>
                <Panel.Body>
                  <span>{knowledgeMatriz.name}</span>
                </Panel.Body>
                <Panel.ProgressBar
                  partialValue={knowledgeMatriz.partialValue}
                />
              </Panel.Item>
            ))}
          </div>
        </DropDownTabs>
      </div>
    </TeamTemplate>
  );
};

export default Team;
