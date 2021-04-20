import { useMutation } from '@apollo/client';
import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import AppContext from '../../AppContext';
import SkillContext from '../../components/skill-management/SkillContext';
import SkillContextProvider from '../../components/skill-management/SkillContextProvider';
import SkillManagement from '../../components/skill-management/SkillManagement';
import WelcomeContent from '../../components/welcome/WelcomeContent';
import { CreateGrowMapMutation } from '../../graphql/mutations';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';
import { GrowMap, GrowMapMutationData, Types } from '../../types';
import ROUTES from '../../utils/routes';

const normalizeGrowMapData = (data: GrowMap): GrowMapMutationData => {
  const normalizedData = {
    knowledgeGapsDetails: data.knowledgeGapsDetails.map(
      ({ knowledgeSkillId }) => ({ knowledgeSkillId }),
    ),
    knowledgeSkillDetails: data.knowledgeSkillDetails.map(
      ({ isMentor, knowledgeMatrizId, knowledgeSkillId }) => ({
        isMentor,
        knowledgeMatrizId,
        knowledgeSkillId,
      }),
    ),
    userDetails: data.userDetails as any,
  };

  return normalizedData;
};

const SkillDetails = () => {
  const {
    dispatch: dispatchApp,
    state: {
      welcome: { data, steps },
    },
  } = useContext(AppContext);
  const {
    state: { selectedSkills },
  } = useContext(SkillContext);

  const [onCreateGrowMap, { loading }] = useMutation(CreateGrowMapMutation);

  const i18n = useLang();
  const router = useRouter();

  const canSave =
    steps.every(({ checked, value }) =>
      value === 'knowledge-gaps' ? true : checked,
    ) && selectedSkills.length;

  const saveData = () => {
    dispatchApp({
      payload: {
        ...data,
        knowledgeGapsDetails: selectedSkills,
      },
      type: Types.UPDATE_DATA,
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

    // Make GrowMapMutation

    onCreateGrowMap({
      variables: {
        data: normalizeGrowMapData({
          ...data,
          knowledgeGapsDetails: selectedSkills,
        } as GrowMap),
      },
    });

    if (!loading) {
      router.push(ROUTES.SUCCESS_PAGE);
    }
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

        <ClayButton disabled={!canSave} onClick={onClickNext}>
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
        data: { knowledgeGapsDetails, knowledgeSkillDetails },
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
