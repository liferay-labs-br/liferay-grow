import { gql } from '@apollo/client';

import { GITHUB_FRAGMENT, GROW_MAP_FRAGMENT } from './fragments';

export const getMe = gql`
  ${GITHUB_FRAGMENT}
  ${GROW_MAP_FRAGMENT}

  query {
    me {
      id
      github {
        ...GithubFields
      }
      growMap {
        ...GrowMapFields
      }
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
  query {
    matriz: getAllKnowledgeMatriz {
      id
      name
    }
  }
`;

export const allKnowledgeSkillsPaginate = gql`
  query($data: PaginateFilterInputKnowledgeSkill!) {
    skillsPaginate: getAllKnowledgeSkillPaginate(data: $data) {
      pagination {
        currentPage
        endIndex
        endPage
        pageSize
        pages
        startIndex
        startPage
        totalItems
        totalPages
        totalPages
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
