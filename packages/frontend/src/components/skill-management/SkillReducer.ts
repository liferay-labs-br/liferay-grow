export const SkillManagementState: SkillManagement = {
  knowledgeMatriz: [],
  pagination: null,
  search: '',
  selectedSkills: [],
  skills: [],
  variables: { pageIndex: 1, pageSize: 9 },
};

export const SkillManagementReducer = (
  state: SkillManagement,
  action: SkillManagementActions,
): SkillManagement => {
  switch (action.type) {
    case Types.EDIT_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }

    case Types.EDIT_SKILLS: {
      const { pagination, skills } = action.payload;

      return {
        ...state,
        pagination,
        skills,
      };
    }

    case Types.EDIT_VARIABLES: {
      return {
        ...state,
        variables: action.payload,
      };
    }

    case Types.EDIT_SELECTED_SKILLS: {
      return {
        ...state,
        selectedSkills: action.payload,
      };
    }

    case Types.EDIT_KNOWLEDGE_MATRIZ: {
      return {
        ...state,
        knowledgeMatriz: action.payload,
      };
    }

    default:
      return state;
  }
};
