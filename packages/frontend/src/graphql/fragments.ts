import { gql } from '@apollo/client';

const GITHUB_FRAGMENT = gql`
  fragment GithubFields on Github {
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
`;

const KNOWLEDGE_SKILLS_DETAILS_FRAGMENT = gql`
  fragment KnowledgeSkillsDetailsFragment on KnowledgeSkillDetails {
    id
    knowledgeSkill {
      id
      name
    }
    knowledgeMatriz {
      id
      name
      matrizLevel
    }
  }
`;

const KNOWLEDGE_GAPS_DETAILS_FRAGMENT = gql`
  fragment KnowledgeGapsDetailsFragment on KnowledgeGapsDetails {
    id
    knowledgeSkill {
      id
      name
    }
  }
`;

const USER_DETAILS_FRAGMENT = gql`
  fragment UserDetailsFragment on UserDetails {
    id
    role {
      id
      name
    }
    teams {
      id
      name
      members {
        id
      }
    }
  }
`;

const GROW_MAP_FRAGMENT = gql`
  ${USER_DETAILS_FRAGMENT}
  ${KNOWLEDGE_SKILLS_DETAILS_FRAGMENT}
  ${KNOWLEDGE_GAPS_DETAILS_FRAGMENT}

  fragment GrowMapFields on GrowMap {
    id
    userDetails {
      ...UserDetailsFragment
    }
    knowledgeSkillDetails {
      ...KnowledgeSkillsDetailsFragment
    }
    knowledgeGapsDetails {
      ...KnowledgeGapsDetailsFragment
    }
  }
`;

export const KNOWLEDGE_MATRIZ_FRAGMENT = gql`
  fragment KnowledgeMatrizFragment on KnowledgeMatriz {
    id
    name
    matrizLevel
  }
`;

export const KNOWLEDGE_AREA_FRAGMENT = gql`
  fragment KnowledgeAreaFragment on KnowledgeArea {
    id
    name
    skills {
      id
      name
    }
  }
`;

export const ME_FRAGMENT = gql`
  ${GITHUB_FRAGMENT}
  ${GROW_MAP_FRAGMENT}

  fragment MeFragment on User {
    id
    github {
      ...GithubFields
    }
    growMap {
      ...GrowMapFields
    }
  }
`;

export const PAGINATION_FRAGMENT = gql`
  fragment PaginationFragment on Pagination {
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
`;
