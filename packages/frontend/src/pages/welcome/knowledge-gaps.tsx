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
import { Types, SelectedSkills, KnowledgeGapsDetails } from '../../types';
import ROUTES from '../../utils/routes';

const SkillDetails: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const {
    dispatch: dispatchApp,
    state: {
      welcome: { growMap },
    },
  } = useContext(AppContext);
  const {
    state: { selectedSkills },
  } = useContext(SkillContext);

  const i18n = useLang();
  const router = useRouter();

  const saveData = () => {
    dispatchApp({
      payload: {
        ...growMap,
        knowledgeGapsDetails: selectedSkills,
      },
      type: Types.UPDATE_GROW_MAP,
    });
  };

  const onClickPrev = () => {
    saveData();

    router.push(ROUTES.SKILLS_DETAILS);
  };

  const onClickNext = () => {
    dispatchApp({
      payload: { checked: true, value: 'knowledge-gaps' },
      type: Types.UPDATE_STEP,
    });

    saveData();

    router.push(ROUTES.SUCCESS_PAGE);
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
          {i18n.get('submit')}
        </ClayButton>
      </WelcomeContent.Footer>
    </WelcomeContent>
  );
};

const SkillsDetailsWrapper = () => {
  const {
    state: {
      welcome: {
        growMap: { knowledgeGapsDetails, knowledgeSkillDetails },
      },
    },
  } = useContext(AppContext);

  return (
    <SkillContextProvider
      defaultState={{
        knowledgeMatrizLevelAllowed: false,
        selectedSkills: knowledgeGapsDetails,
        unavailableKnowledgeSkills: knowledgeSkillDetails,
      }}
    >
      <SkillDetails />
    </SkillContextProvider>
  );
};

export default withAuth(SkillsDetailsWrapper);
