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
import ROUTES from '../../utils/routes';

/**
 * Skills Details page must have these implemented functions
 * saveData: () => void;
 * onClickNextPage: () => void;
 * onClickPrevPage: () => void;
 * isEnableToNextPage: () => boolean;
 */

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

  const isEnableToNextPage = () => {
    return !!selectedSkills.length;
  };

  const saveData = () => {
    dispatchApp({
      payload: {
        ...growMap,
        knowledgeSkillsDetails: selectedSkills,
      },
      type: Types.UPDATE_GROW_MAP,
    });
  };

  const onClickPrevPage = () => {
    saveData();

    router.push(ROUTES.GET_STARTED);
  };

  const onClickNextPage = () => {
    dispatchApp({
      payload: { checked: isEnableToNextPage(), value: 'skills-details' },
      type: Types.UPDATE_STEP,
    });

    saveData();

    router.push(ROUTES.KNOWLEDGE_GAP);
  };

  return (
    <WelcomeContent>
      <WelcomeContent.Title>{i18n.get('skills-details')}</WelcomeContent.Title>
      <WelcomeContent.Body>
        <SkillManagement />
      </WelcomeContent.Body>
      <WelcomeContent.Footer>
        <ClayButton
          displayType="secondary"
          className="mr-2"
          onClick={onClickPrevPage}
        >
          {i18n.get('prev')}
        </ClayButton>

        <ClayButton disabled={!isEnableToNextPage()} onClick={onClickNextPage}>
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
        growMap: { knowledgeSkillDetails },
      },
    },
  } = useContext(AppContext);

  return (
    <SkillContextProvider
      defaultState={{ selectedSkills: knowledgeSkillDetails }}
    >
      <SkillDetails />
    </SkillContextProvider>
  );
};

export default withAuth(SkillsDetailsWrapper);
