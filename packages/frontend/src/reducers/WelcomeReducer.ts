import { ActionMap, ActionsPayload, Steps, Types, Welcome } from '../types';

type WelcomeActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

const STEPS: Steps = [
  { checked: false, value: 'get-started' },
  { checked: false, value: 'skills-details' },
  { checked: false, value: 'knowledge-gaps' },
];

export const welcomeState: Welcome = {
  data: {
    knowledgeGapsDetails: [],
    knowledgeSkillDetails: [],
    userDetails: {},
  },
  steps: STEPS,
};

export const welcomeReducer = (
  state: Welcome,
  action: WelcomeActions,
): Welcome => {
  switch (action.type) {
    case Types.SET_GET_STARTED_DATA: {
      return state;
    }
    case Types.SET_SKILLS_DATA: {
      return {
        ...state,
        data: {
          ...state.data,
          knowledgeSkillDetails: action.payload,
        },
      };
    }
    case Types.SET_KNOWLEDGE_GAPS_DATA: {
      return {
        ...state,
        data: {
          ...state.data,
          knowledgeGapsDetails: action.payload,
        },
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
