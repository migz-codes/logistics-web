import { gql } from '@apollo/client'
import type { AuthResponse, LogoutResponse } from '@/types/api'

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

export interface LoginResponse {
  login: AuthResponse
}

export const LOGOUT_MUTATION = gql`
  mutation Logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken) {
      success
    }
  }
`

export interface LogoutResponseData {
  logout: LogoutResponse
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
        role
        created_at
        updated_at
      }
    }
  }
`

export interface RegisterResponse {
  register: AuthResponse
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
  refreshToken: AuthResponse
}
