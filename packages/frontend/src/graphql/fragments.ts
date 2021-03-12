import { gql } from '@apollo/client';

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
    }
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
