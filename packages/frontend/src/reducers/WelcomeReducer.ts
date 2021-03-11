const STEPS: Steps = [
  { checked: false, value: 'get-started' },
  { checked: false, value: 'skills-details' },
  { checked: false, value: 'knowledge-gaps' },
];

export const welcomeState = {
  steps: STEPS,
};

export const welcomeReducer = (
  state: {
    steps: Steps;
  },
  action: WelcomeActions,
): Welcome => {
  switch (action.type) {
    case Types.SET_GET_STARTED_DATA: {
      return state;
    }
    case Types.SET_SKILLS_DATA: {
      return state;
    }
    case Types.SET_KNOWLEDGE_GAPS_DATA: {
      return state;
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
