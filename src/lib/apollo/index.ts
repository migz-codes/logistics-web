export { apolloClient } from './client'
export type {
  LoginInput,
  LoginResponse,
  LogoutResponse,
  RegisterInput,
  RegisterResponse
} from './mutations/auth'
export { LOGIN_MUTATION, LOGOUT_MUTATION, REGISTER_MUTATION } from './mutations/auth'
export type {
  GetCurrentUserResponse,
  GetMeResponse,
  UpdatePasswordInput,
  UpdatePasswordResponse,
  UpdateProfileInput,
  UpdateProfileResponse
} from './mutations/user'
export {
  GET_CURRENT_USER_QUERY,
  GET_ME_QUERY,
  UPDATE_PASSWORD_MUTATION,
  UPDATE_PROFILE_MUTATION
} from './mutations/user'
export { ApolloProviderWrapper } from './provider'
