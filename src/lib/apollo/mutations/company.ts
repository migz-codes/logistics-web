import { gql } from '@apollo/client'

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
  query GetAllCompanies {
    companies {
      id
      name
      logo
      owner_id
      created_at
      updated_at
    }
  }
`

export interface Company {
  id: string
  name: string
  logo?: string | null
  owner_id: string
  created_at: string
  updated_at: string
}

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

export interface CreateCompanyInput {
  name: string
  logo?: string
}

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

export interface UpdateCompanyInput {
  name?: string
  logo?: string
}

export interface UpdateCompanyResponse {
  updateCompany: Company
}

export const DELETE_COMPANY_MUTATION = gql`
  mutation DeleteCompany($id: String!) {
    deleteCompany(id: $id) {
      id
      name
      success
    }
  }
`

export interface DeleteCompanyResponse {
  deleteCompany: {
    id: string
    name: string
    success: boolean
  }
}
