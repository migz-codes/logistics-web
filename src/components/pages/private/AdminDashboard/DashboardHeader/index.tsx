'use client'

import { PageHeader } from '@/components/pages/private/shared/PageHeader'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return <PageHeader title={title} description={subtitle} />
}
