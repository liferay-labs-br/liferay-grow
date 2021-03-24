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
