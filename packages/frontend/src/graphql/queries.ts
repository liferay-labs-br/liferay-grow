import { gql } from '@apollo/client';

const allOffices = `
  getAllOffice {
    id
    name
    teams {
      id
      name
    }
  }
`;

const allCareerDepartament = `
  getAllCareerDepartament {
    id
    name
    careers {
      id
      name
    }
  }
}
`;

export const getStarted = gql`
  query {
    offices: ${allOffices}

    careerDepartaments: ${allCareerDepartament}
`;
