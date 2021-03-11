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

export const getMe = gql`
  query {
    me: ${me}
  }
`;
