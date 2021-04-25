import { gql } from '@apollo/client';

import {
  KNOWLEDGE_AREA_FRAGMENT,
  KNOWLEDGE_MATRIZ_FRAGMENT,
  ME_FRAGMENT,
  PAGINATION_FRAGMENT,
  TEAM_FRAGMENT,
} from './fragments';

export const getServerInfo = gql`
  query {
    serverInfo: getServerInfo {
      SERVER_NAME
      SERVER_VERSION
    }
  }
`;

export const getMe = gql`
  ${ME_FRAGMENT}
  ${KNOWLEDGE_MATRIZ_FRAGMENT}

  query {
    me {
      ...MeFragment
    }

    allKnowledgeMatriz: getAllKnowledgeMatriz {
      rows {
        ...KnowledgeMatrizFragment
      }
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
      rows {
        ...KnowledgeMatrizFragment
      }
    }
  }
`;

const allRole = `
  getAllRole {
    rows {
      id
      name
    }
  }
`;

const allOffice = `
  getAllOffice {
    rows {
      id
      name
      city
      country
    }
  }
`;

const allTeam = `
  getAllTeam {
    rows {
      id
      name
      slug
    }
  }
`;

const allDepartment = `
  getAllDepartment {
    rows {
      id
      name
    }
  }
`;

export const allKnowledgeSkills = gql`
  query {
    skills: getAllKnowledgeSkill {
      rows {
        id
        name
        description
        slug
      }
    }
  }
`;

export const allKnowledgeData = gql`
  ${KNOWLEDGE_MATRIZ_FRAGMENT}
  ${KNOWLEDGE_AREA_FRAGMENT}

  query {
    matriz: getAllKnowledgeMatriz {
      rows {
        ...KnowledgeMatrizFragment
      }
    }

    area: getAllKnowledgeArea {
      rows {
        ...KnowledgeAreaFragment
      }
    }
  }
`;

export const allKnowledgeSkillsPaginate = gql`
  ${PAGINATION_FRAGMENT}

  query($data: PaginateFilterInputKnowledgeSkill!) {
    skillsPaginate: getAllKnowledgeSkill(data: $data) {
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

export const knowledgeSkillBySlug = gql`
  query knowledgeSkillBySlug($slug: String!) {
    getKnowledgeSkillBySlug(slug: $slug) {
      id
      name
      description
      area {
        name
      }
      summary {
        id
        name
        description
        value
      }
      mentoringMembers: userSkills(data: { isMentor: true }) {
        id
        growMap {
          userDetails {
            office {
              name
            }
            role {
              name
            }
          }
        }
        profile {
          id
          name
          avatar_url
          github_login
        }
      }
      otherMembers: userSkills {
        id
        profile {
          id
          name
          avatar_url
          github_login
        }
      }
      userGaps {
        id
        profile {
          id
          name
          avatar_url
          github_login
        }
      }
    }
  }
`;

export const membersKnowledgeSkillBySlug = gql`
  query($skill: String!, $matriz: String!) {
    getKnowledgeSkillBySlug(slug: $skill) {
      id
      name
      userSkills(data: { matrizId: $matriz }) {
        id
        profile {
          github_login
          name
          avatar_url
        }
      }
      userGaps {
        id
        profile {
          github_login
          name
          avatar_url
        }
      }
    }
  }
`;

export const getStarted = gql`
  query {
    roles: ${allRole}
    teams: ${allTeam}
    departments: ${allDepartment}
    offices: ${allOffice}
  }
`;

export const getTeamBySlug = gql`
  ${PAGINATION_FRAGMENT}

  query($slug: String!, $membersInput: UserPaginationInput!) {
    getAllKnowledgeMatriz {
      rows {
        id
        name
        matrizLevel
      }
    }

    getTeamBySlug(slug: $slug) {
      id
      name
      knowledgeMatrizAverage {
        id
        matrizLevelAvg
      }
      knowledgeArea {
        id
        name
        skills {
          id
          name
          slug
        }
      }
      members(data: $membersInput) {
        pagination {
          ...PaginationFragment
        }
        rows {
          id
          profile {
            name
            avatar_url
            email
            github_login
          }
          growMap {
            userDetails {
              office {
                name
              }
              role {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const getMembersTeam = gql`
  query($team: String!) {
    getTeam(id: $team) {
      members {
        rows {
          id
          profile {
            name
            avatar_url
            email
          }
        }
      }
    }
  }
`;

export const getAllTeams = gql`
  ${TEAM_FRAGMENT}
  ${PAGINATION_FRAGMENT}

  query($data: getAllInputTeam!) {
    teams: getAllTeam(data: $data) {
      pagination {
        ...PaginationFragment
      }
      rows {
        ...TeamFragment
        members {
          rows {
            profile {
              name
              github_login
              avatar_url
            }
          }
        }
      }
    }
  }
`;
