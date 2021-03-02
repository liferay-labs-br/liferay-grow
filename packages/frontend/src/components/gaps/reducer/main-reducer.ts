enum Types {
  EDIT_STEP = 'EDIT_STEP',
  EDIT_OFFICES = 'EDIT_OFFICES',
  EDIT_CAREERS = 'EDIT_CAREERS',
}

interface DefaultEntity {
  id: string;
  name: string;
}

interface Office extends DefaultEntity {
  teams: DefaultEntity[];
}

interface Career extends DefaultEntity {
  careers: DefaultEntity[];
}
export type Main = {
  step: string;
  offices: Office[];
  carrees: Career[];
};

const mainState: Main = {
  carrees: [],
  offices: [],
  step: 'get-started',
};

type Action = {
  type: Types;
  payload: any;
};

export const mainReducer = (state: Main, action: Action): Main => {
  switch (action.type) {
    case Types.EDIT_STEP: {
      return {
        ...state,
        step: action.payload,
      };
    }

    case Types.EDIT_OFFICES: {
      return {
        ...state,
        offices: action.payload,
      };
    }

    case Types.EDIT_CAREERS: {
      return {
        ...state,
        carrees: [...action.payload].map((careerDepartament) => ({
          ...careerDepartament,
          careers: [...careerDepartament.careers].sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        })),
      };
    }

    default:
      return state;
  }
};

export { Types, mainState };
