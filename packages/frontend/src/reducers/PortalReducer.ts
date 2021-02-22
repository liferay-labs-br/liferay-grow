import { ActionMap } from '.';

export const LANGUAGE_KEY = '@liferay-app/language';

export enum Languages {
  pt_BR = 'pt_BR',
  en_US = 'en_US',
}

export const DEFAULT_LANGUAGE_ID = Languages.en_US;

export enum Types {
  EDIT_LANGUAGE = 'EDIT_LANGUAGE',
}

export type Portal = {
  languageId: Languages;
};

type PortalActionPayload = {
  [Types.EDIT_LANGUAGE]: string;
};

export const portalState = {
  languageId: DEFAULT_LANGUAGE_ID,
};

export type PortalActions = ActionMap<PortalActionPayload>[keyof ActionMap<PortalActionPayload>];

export const portalReducer = (
  state: Portal,
  action: PortalActions | any,
): Portal => {
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
