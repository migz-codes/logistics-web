'use client'

import { useParams } from 'next/navigation'
import { EditProperty } from '@/components/pages/private/Properties/Edit'

export default function EditPropertyPage() {
  const params = useParams()
  const warehouseId = params.id as string

  return <EditProperty warehouseId={warehouseId} />
}
