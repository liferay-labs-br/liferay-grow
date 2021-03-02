import { ActionMap } from '../../../reducers';

enum Types {
  EDIT_OFFICE = 'EDIT_OFFICE',
}

export type Office = {
  title: string;
  id: string;
};

type StartActionPayload = {
  [Types.EDIT_OFFICE]: string;
};

export type GetStarted = {
  office: Office | null;
};

const startState: GetStarted = {
  office: null,
};

type StartActions = ActionMap<StartActionPayload>[keyof ActionMap<StartActionPayload>];

export const startReducer = (
  state: GetStarted,
  action: StartActions | any,
): GetStarted => {
  switch (action.type) {
    case Types.EDIT_OFFICE: {
      return {
        ...state,
        office: action.payload,
      };
    }

    default:
      return state;
  }
};

export { Types, startState };
