import { gql } from '@apollo/client'

export type Role = 'INVESTOR_ADMIN' | 'ADMIN'

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
  getMe: {
    id: string
    name: string
    email: string
    role: Role
    created_at: string
    updated_at: string
  }
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
  mutation UpdatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
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

export interface UserWithRole {
  id: string
  name: string
  email: string
  role: Role
}

export interface GetAllUsersResponse {
  getAllUsers: UserWithRole[]
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
  updateUserRole: {
    id: string
    role: Role
  }
}
