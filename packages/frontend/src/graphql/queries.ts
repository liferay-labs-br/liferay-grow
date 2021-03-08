import { gql } from '@apollo/client';

const me = `
  me {
    id
    github {
      id
      accountId
      login
      avatar_url
      email
      name
      company
      location
      bio
    }
  }
`;

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

export const getMe = gql`
  query {
    me: ${me}
  }
`;
