import {
  ActionMap,
  ActionsPayload,
  GrowMapOfficeInput,
  KnowledgeGapsDetails,
  KnowledgeSkillDetails,
  Steps,
  Types,
  Welcome,
} from '@/types';

type WelcomeActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

const STEPS: Steps = [
  { checked: false, value: 'get-started' },
  { checked: false, value: 'skills-details' },
  { checked: false, value: 'knowledge-gaps' },
];

export const welcomeState: Welcome = {
  data: {
    knowledgeGapsDetails: [] as KnowledgeGapsDetails[],
    knowledgeSkillDetails: [] as KnowledgeSkillDetails[],
    userDetails: {} as GrowMapOfficeInput,
  },
  steps: STEPS,
};

export const welcomeReducer = (
  state: Welcome,
  action: WelcomeActions,
): Welcome => {
  switch (action.type) {
    case Types.UPDATE_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case Types.UPDATE_STEP: {
      const { checked, value } = action.payload;

      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.value === value) {
            return {
              ...step,
              checked,
            };
          }

          return step;
        }),
      };
    }
    default:
      return state;
  }
};
