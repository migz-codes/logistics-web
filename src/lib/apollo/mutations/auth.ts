import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        name
        email
        role
        created_at
        updated_at
      }
    }
  }
`

export interface LoginInput {
  email: string
  password: string
}

export interface LoginResponse {
  login: {
    accessToken: string
    refreshToken: string
    user: {
      id: string
      name: string
      email: string
      role: string
      created_at: string
      updated_at: string
    }
  }
}

export const LOGOUT_MUTATION = gql`
  mutation Logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken) {
      success
    }
  }
`

export interface LogoutResponse {
  logout: { success: boolean }
}

export const REGISTER_MUTATION = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      accessToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  register: {
    accessToken: string
    refreshToken: string
    user: { id: string; name: string; email: string }
  }
}

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`

export interface RefreshTokenResponse {
  refreshToken: {
    accessToken: string
    refreshToken: string
  }
}
