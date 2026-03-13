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
  Company,
  CreateCompanyInput,
  CreateCompanyResponse,
  DeleteCompanyResponse,
  GetCompaniesResponse,
  UpdateCompanyInput,
  UpdateCompanyResponse
} from './mutations/company'
export {
  CREATE_COMPANY_MUTATION,
  DELETE_COMPANY_MUTATION,
  GET_COMPANIES_QUERY,
  UPDATE_COMPANY_MUTATION
} from './mutations/company'
export type {
  GetAllUsersResponse,
  GetCurrentUserResponse,
  GetMeResponse,
  Role,
  UpdatePasswordInput,
  UpdatePasswordResponse,
  UpdateProfileInput,
  UpdateProfileResponse,
  UpdateUserRoleResponse,
  UserWithRole
} from './mutations/user'
export {
  GET_ALL_USERS_QUERY,
  GET_CURRENT_USER_QUERY,
  GET_ME_QUERY,
  UPDATE_PASSWORD_MUTATION,
  UPDATE_PROFILE_MUTATION,
  UPDATE_USER_ROLE_MUTATION
} from './mutations/user'
export { ApolloProviderWrapper } from './provider'
