import { gql } from '@apollo/client'
import type { Company } from '@/types/api'

export const GET_COMPANIES_QUERY = gql`
  query GetMyCompanies {
    getMyCompanies {
      id
      name
      logo
      owner_id
      created_at
      updated_at
    }
  }
`

export const GET_ALL_COMPANIES_QUERY = gql`
  query GetAllCompanies($filters: CompanyFiltersInput) {
    companies(filters: $filters) {
      id
      name
      logo
      owner_id
      created_at
      updated_at
    }
  }
`

export interface GetCompaniesResponse {
  getMyCompanies: Company[]
}

export interface GetAllCompaniesResponse {
  companies: Company[]
}

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      name
      logo
      owner_id
      created_at
      updated_at
    }
  }
`

export interface CreateCompanyResponse {
  createCompany: Company
}

export const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      id
      name
      logo
      owner_id
      created_at
      updated_at
    }
  }
`

export interface UpdateCompanyResponse {
  updateCompany: Company
}

export const REMOVE_COMPANY_MUTATION = gql`
  mutation RemoveCompany($id: String!) {
    removeCompany(id: $id) {
      id
      name
    }
  }
`

export interface RemoveCompanyResponse {
  removeCompany: Company
}
