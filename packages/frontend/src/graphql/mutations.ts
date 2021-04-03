import { gql } from '@apollo/client';

export const authGithub = gql`
  mutation authGithub($code: String!) {
    authGithub(code: $code)
  }
`;

export const CreateGrowMapMutation = gql`
  mutation CreateGrowMap($data: GrowMapBaseInput!) {
    createGrowMap(data: $data) {
      id
    }
  }
`;

export const UpdateGrowMapGapsDetails = gql`
  mutation UpdateGrowMapGapsDetails($data: GrowMapSkillGapsInput!) {
    updateGrowMapGapsDetails(data: $data)
  }
`;

export const UpdateGrowMapSkillDetails = gql`
  mutation UpdateGrowMapSkillDetails($data: GrowMapSkillDetailsInput!) {
    updateGrowMapSkillDetails(data: $data)
  }
`;

export const CreateKnowledgeSkill = gql`
  mutation CreateKnowledgeSkill($data: CreateKnowledgeSkillInput!) {
    createKnowledgeSkill(data: $data) {
      id
      name
      slug
    }
  }
`;
