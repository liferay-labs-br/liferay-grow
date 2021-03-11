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

export const GITHUB_FRAGMENT = gql`
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

export const GROW_MAP_FRAGMENT = gql`
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
