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

export const SignInMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const SignUpMutation = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const deleteOrderMutation = gql`
  mutation DeleteOrder($id: String!) {
    deleteByOrderID(id: $id)
  }
`;

export const getAllOrders = gql`
  query getOrders {
    getAllOrder {
      id
      name
      createdBy
      createdAt
      modifiedAt
      status
    }
  }
`;

export const getOrderQuery = gql`
  query getOrder($id: String!) {
    getOrder(id: $id) {
      id
      createdBy
      createdAt
      modifiedAt
      name
      status
      services {
        id
        name
        orderId
        assinedTo
        createdAt
        statusMessage
        type
        description
        status
      }
    }
  }
`;

export const createOrderMutation = gql`
  mutation CreateOrder($data: CreateOrderInput!) {
    createOrder(data: $data) {
      id
    }
  }
`;
