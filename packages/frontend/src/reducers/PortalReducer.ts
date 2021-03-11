export const LANGUAGE_KEY = '@liferay-app/language';

export const DEFAULT_LANGUAGE_ID = Languages.en_US;

export const portalState = {
  languageId: DEFAULT_LANGUAGE_ID,
};

export const portalReducer = (state: Portal, action: PortalActions): Portal => {
  switch (action.type) {
    case Types.EDIT_LANGUAGE: {
      return {
        ...state,
        languageId: action.payload,
      };
    }

    default:
      return state;
  }
};
