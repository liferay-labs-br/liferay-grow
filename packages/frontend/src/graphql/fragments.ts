import { gql } from '@apollo/client';

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
  }
`;

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
  ${PAGINATION_FRAGMENT}

  fragment UserDetailsFragment on UserDetails {
    id
    role {
      id
      name
    }
    teams {
      id
      name
      slug
      members {
        pagination {
          ...PaginationFragment
        }
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
      slug
    }
  }
`;

export const TEAM_FRAGMENT = gql`
  fragment TeamFragment on Team {
    id
    name
    slug
  }
`;

export const OFFICE_FRAGMENT = gql`
  fragment OfficeFragment on Office {
    id
    name
    city
    state
    address
    country
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
