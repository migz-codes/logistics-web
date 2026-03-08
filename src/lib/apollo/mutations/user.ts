import { gql } from '@apollo/client'

export const GET_ME_QUERY = gql`
  query GetMe {
    getMe {
      id
      name
      email
    }
  }
`

export interface GetMeResponse {
  getMe: {
    id: string
    name: string
    email: string
  }
}

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($userId: String!, $input: UpdateProfileInput!) {
    updateProfile(userId: $userId, input: $input) {
      id
      name
      email
    }
  }
`

export interface UpdateProfileInput {
  name: string
  email: string
}

export interface UpdateProfileResponse {
  updateProfile: {
    id: string
    name: string
    email: string
  }
}

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($userId: String!, $input: UpdatePasswordInput!) {
    updatePassword(userId: $userId, input: $input) {
      id
    }
  }
`

export interface UpdatePasswordInput {
  currentPassword: string
  newPassword: string
}

export interface UpdatePasswordResponse {
  updatePassword: {
    id: string
  }
}

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser($id: String!) {
    getUserById(id: $id) {
      id
      name
      email
    }
  }
`

export interface GetCurrentUserResponse {
  getUserById: {
    id: string
    name: string
    email: string
  }
}
