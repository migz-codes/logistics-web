'use client'

import { Badge } from '@/components/shared/ui/Badge'
import { Icon } from '@/components/shared/ui/Icon'

interface KpiItem {
  icon: string
  label: string
  value: string
  unit?: string
  change?: string
  changeType?: 'positive' | 'negative'
}

const defaultKpis: KpiItem[] = [
  {
    icon: 'visibility',
    label: 'New Leads (MTD)',
    value: '287',
    change: '+18%',
    changeType: 'positive'
  },
  {
    icon: 'trending_up',
    label: 'Conv. Rate',
    value: '12.8%',
    change: '+2.4%',
    changeType: 'positive'
  },
  {
    icon: 'attach_money',
    label: 'Revenue (YTD)',
    value: 'R$ 42.5M',
    change: '+24%',
    changeType: 'positive'
  },
  {
    icon: 'apartment',
    label: 'Active Listings',
    value: '156',
    change: '+8',
    changeType: 'positive'
  }
]

interface KpiCardsProps {
  kpis?: KpiItem[]
}

export function KpiCards({ kpis = defaultKpis }: KpiCardsProps) {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className='bg-white p-6 rounded-3xl border border-primary/5 shadow-sm hover:shadow-lg transition-shadow'
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary'>
              <Icon name={kpi.icon} size='lg' />
            </div>
            {kpi.change && (
              <Badge variant={kpi.changeType === 'positive' ? 'success' : 'warning'} size='sm'>
                {kpi.change}
              </Badge>
            )}
          </div>
          <p className='text-[10px] font-black uppercase tracking-widest text-earth/40'>
            {kpi.label}
          </p>
          <h3 className='text-2xl font-black mt-1 text-earth'>
            {kpi.value}
            {kpi.unit && <span className='text-sm font-medium text-earth/50 ml-1'>{kpi.unit}</span>}
          </h3>
        </div>
      ))}
    </div>
  )
}
