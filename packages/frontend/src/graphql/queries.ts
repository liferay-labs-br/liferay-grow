import { gql } from '@apollo/client';

import {
  KNOWLEDGE_MATRIZ_FRAGMENT,
  ME_FRAGMENT,
  PAGINATION_FRAGMENT,
} from './fragments';

export const getMe = gql`
  ${ME_FRAGMENT}
  ${KNOWLEDGE_MATRIZ_FRAGMENT}

  query {
    me {
      ...MeFragment
    }

    allKnowledgeMatriz: getAllKnowledgeMatriz {
      ...KnowledgeMatrizFragment
    }
  }
`;

export const getUserByLogin = gql`
  ${ME_FRAGMENT}

  query getUserByLogin($login: String!) {
    user: getUserByLogin(login: $login) {
      ...MeFragment
    }
  }
`;

const allRole = `
  getAllRole {
    id
    name
  }
`;

const allOffice = `
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

export const allKnowledgeMatriz = gql`
  ${KNOWLEDGE_MATRIZ_FRAGMENT}

  query {
    matriz: getAllKnowledgeMatriz {
      ...KnowledgeMatrizFragment
    }
  }
`;

export const allKnowledgeSkillsPaginate = gql`
  ${PAGINATION_FRAGMENT}

  query($data: PaginateFilterInputKnowledgeSkill!) {
    skillsPaginate: getAllKnowledgeSkillPaginate(data: $data) {
      pagination {
        ...PaginationFragment
      }
      rows {
        id
        name
      }
    }
  }
`;

export const getStarted = gql`
  query {
    roles: ${allRole}
    offices: ${allOffice}
  }
`;

export const getAllTeam = gql`
  query {
    teams: getAllTeam {
      id
      name
    }
  }
`;
