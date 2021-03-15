import {
  ActionMap,
  ActionsPayload,
  BasicQuery,
  KnowledgeGapsDetails,
  KnowledgeSkillDetails,
  Steps,
  Types,
  UserDetails,
  Welcome,
} from '../types';

type WelcomeActions = ActionMap<ActionsPayload>[keyof ActionMap<ActionsPayload>];

const STEPS: Steps = [
  { checked: false, value: 'get-started' },
  { checked: false, value: 'skills-details' },
  { checked: false, value: 'knowledge-gaps' },
];

export const welcomeState: Welcome = {
  growMap: {
    id: '',
    knowledgeGapsDetails: [] as KnowledgeGapsDetails[],
    knowledgeSkillDetails: [] as KnowledgeSkillDetails[],
    userDetails: {
      id: '',
      role: {
        id: '',
        name: '',
      },
      teams: [] as BasicQuery[],
    } as UserDetails,
  },
  steps: STEPS,
};

export const welcomeReducer = (
  state: Welcome,
  action: WelcomeActions,
): Welcome => {
  switch (action.type) {
    // case Types.SET_SKILLS_DATA: {
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       knowledgeSkillDetails: action.payload,
    //     },
    //   };
    // }
    // case Types.SET_KNOWLEDGE_GAPS_DATA: {
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       knowledgeGapsDetails: action.payload,
    //     },
    //   };
    // }
    case Types.UPDATE_GROW_MAP: {
      const growMap = action.payload;

      return {
        ...state,
        growMap,
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
