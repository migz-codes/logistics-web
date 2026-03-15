import { gql } from '@apollo/client'
import type { Company } from '@/types/api'

export const GET_COMPANIES_QUERY = gql`
  query GetMyCompanies($pagination: PaginationInput) {
    getMyCompanies(pagination: $pagination) {
      companies {
        id
        name
        logo
        owner_id
        created_at
        updated_at
      }
      info {
        total
        page
        take
        total_pages
      }
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

export interface PaginationInfo {
  total: number
  page: number
  take: number
  total_pages: number
}

export interface PaginatedCompaniesResponse {
  companies: Company[]
  info: PaginationInfo
}

export interface GetCompaniesResponse {
  getMyCompanies: PaginatedCompaniesResponse
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
