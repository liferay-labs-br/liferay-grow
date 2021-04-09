import { gql } from '@apollo/client';

import {
  KNOWLEDGE_AREA_FRAGMENT,
  KNOWLEDGE_MATRIZ_FRAGMENT,
  ME_FRAGMENT,
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
  }
`;

const allTeam = `
  getAllTeam {
    id
    name
    slug
  }
`;

export const allKnowledgeSkills = gql`
  query {
    skills: getAllKnowledgeSkill {
      id
      name
      description
      slug
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
        name
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
        github {
          id
          name
          avatar_url
          login
        }
      }
      otherMembers: userSkills {
        id
        github {
          id
          name
          avatar_url
          login
        }
      }
    }
  }
`;

export const getStarted = gql`
  query {
    roles: ${allRole}
    teams: ${allTeam}
    offices: ${allOffice}
  }
`;

export const getTeamBySlug = gql`
  ${PAGINATION_FRAGMENT}

  query($slug: String!) {
    getAllKnowledgeMatriz {
      id
      name
      matrizLevel
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
      members {
        pagination {
          ...PaginationFragment
        }
        rows {
          id
          github {
            name
            avatar_url
            email
            login
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
          github {
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

  query {
    teams: getAllTeam {
      ...TeamFragment
      members {
        pagination {
          ...PaginationFragment
        }
      }
    }
  }
`;
