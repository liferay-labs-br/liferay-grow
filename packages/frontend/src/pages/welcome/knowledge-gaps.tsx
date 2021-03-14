import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import AppContext from '../../AppContext';
import SkillContext from '../../components/skill-management/SkillContext';
import SkillContextProvider from '../../components/skill-management/SkillContextProvider';
import SkillManagement from '../../components/skill-management/SkillManagement';
import WelcomeContent from '../../components/welcome/WelcomeContent';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';
import { Types } from '../../types';

const SkillDetails: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const { dispatch: dispatchApp } = useContext(AppContext);
  const {
    state: { selectedSkills },
  } = useContext(SkillContext);

  const i18n = useLang();
  const router = useRouter();

  const saveData = () => {
    dispatchApp({
      payload: selectedSkills,
      type: Types.SET_KNOWLEDGE_GAPS_DATA,
    });
  };

  const onClickPrev = () => {
    saveData();

    router.push('skills-details');
  };

  const onClickNext = () => {
    dispatchApp({
      payload: { checked: true, value: 'knowledge-gaps' },
      type: Types.UPDATE_STEP,
    });

    saveData();

    router.push('success-page');
  };

  return (
    <WelcomeContent>
      <WelcomeContent.Title>{i18n.get('knowledge-gaps')}</WelcomeContent.Title>
      <WelcomeContent.Body>
        <SkillManagement />
      </WelcomeContent.Body>
      <WelcomeContent.Footer>
        <ClayButton
          displayType="secondary"
          className="mr-2"
          onClick={onClickPrev}
        >
          {i18n.get('prev')}
        </ClayButton>

        <ClayButton disabled={!selectedSkills.length} onClick={onClickNext}>
          {i18n.get('next')}
        </ClayButton>
      </WelcomeContent.Footer>
    </WelcomeContent>
  );
};

const SkillsDetailsWrapper = () => {
  const {
    state: {
      welcome: {
        data: { knowledgeGapsDetails },
      },
    },
  } = useContext(AppContext);

  return (
    <SkillContextProvider
      defaultState={{
        knowledgeMatrizLevelAllowed: false,
        selectedSkills: knowledgeGapsDetails,
      }}
    >
      <SkillDetails />
    </SkillContextProvider>
  );
};

export default withAuth(SkillsDetailsWrapper);
