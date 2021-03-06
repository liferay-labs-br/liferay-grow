import { gql } from '@apollo/client';

export const authGithub = gql`
  mutation authGithub($code: String!) {
    authGithub(code: $code)
  }
`;

export const RecoveryMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
