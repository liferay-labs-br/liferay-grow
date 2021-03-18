import { gql } from '@apollo/client';

import {
  KNOWLEDGE_AREA_FRAGMENT,
  KNOWLEDGE_MATRIZ_FRAGMENT,
  ME_FRAGMENT,
  OFFICE_FRAGMENT,
  PAGINATION_FRAGMENT,
  TEAM_FRAGMENT,
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
  ${KNOWLEDGE_MATRIZ_FRAGMENT}

  query($login: String!) {
    user: getUserByLogin(login: $login) {
      ...MeFragment
    }

    allKnowledgeMatriz: getAllKnowledgeMatriz {
      ...KnowledgeMatrizFragment
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
    city
    country
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

export const allKnowledgeData = gql`
  ${KNOWLEDGE_MATRIZ_FRAGMENT}
  ${KNOWLEDGE_AREA_FRAGMENT}

  query {
    matriz: getAllKnowledgeMatriz {
      ...KnowledgeMatrizFragment
    }

    area: getAllKnowledgeArea {
      ...KnowledgeAreaFragment
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

export const getAllOffice = gql`
  ${OFFICE_FRAGMENT}
  ${TEAM_FRAGMENT}
  ${PAGINATION_FRAGMENT}

  query {
    offices: getAllOffice {
      ...OfficeFragment
      teams {
        ...TeamFragment
        members {
          pagination {
            ...PaginationFragment
          }
        }
      }
    }
  }
`;
