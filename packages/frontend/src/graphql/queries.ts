import { gql } from '@apollo/client';

const allRoles = `
  getAllRole {
    id
    name
  }
`;

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

export const allKnowledgeSkills = gql`
  query {
    skills: getAllKnowledgeSkill {
      id
      name
    }
  }
`;

export const getStarted = gql`
  query {
    roles: ${allRoles}

    offices: ${allOffices}
  }
`;
