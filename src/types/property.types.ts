export interface IWarehouse {
  id: string
  accountable_id: string
  title: string
  description: string
  city: string
  state: string
  category: string
  area: string
  status: string
  price: string
  address: string
  zip_code: string
  country: string
  created_at: string
  updated_at: string
}

export type IProperty = IWarehouse
