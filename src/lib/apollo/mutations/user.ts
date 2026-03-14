import { gql } from '@apollo/client'
import type { User } from '@/types/api'

export const GET_ME_QUERY = gql`
  query GetMe {
    getMe {
      id
      name
      email
      role
      created_at
      updated_at
    }
  }
`

export interface GetMeResponse {
  getMe: User
}

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      name
      email
    }
  }
`

export interface UpdateProfileResponse {
  updateProfile: User
}

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      id
    }
  }
`

export interface UpdatePasswordResponse {
  updatePassword: User
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
  getUserById: User
}

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      role
    }
  }
`

export interface GetAllUsersResponse {
  getAllUsers: User[]
}

export const UPDATE_USER_ROLE_MUTATION = gql`
  mutation UpdateUserRole($input: UpdateUserRoleInput!) {
    updateUserRole(input: $input) {
      id
      role
    }
  }
`

export interface UpdateUserRoleResponse {
  updateUserRole: User
}
