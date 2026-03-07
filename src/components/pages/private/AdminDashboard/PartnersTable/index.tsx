'use client'

import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

interface Partner {
  id: string
  name: string
  type: string
  status: 'Active' | 'Pending' | 'Inactive'
  investedCapital: string
  properties: number
  lastInteraction: string
}

const defaultPartners: Partner[] = [
  {
    id: '1',
    name: 'Blackstone Ventures',
    type: 'Investment Firm',
    status: 'Active',
    investedCapital: 'R$ 250M',
    properties: 12,
    lastInteraction: '2 days ago'
  },
  {
    id: '2',
    name: 'Prologis Inc.',
    type: 'Developer',
    status: 'Active',
    investedCapital: 'R$ 180M',
    properties: 8,
    lastInteraction: '1 week ago'
  },
  {
    id: '3',
    name: 'GLP Capital Fund',
    type: 'Investment Firm',
    status: 'Pending',
    investedCapital: 'R$ 75M',
    properties: 3,
    lastInteraction: 'Today'
  },
  {
    id: '4',
    name: 'DHL Infrastructure',
    type: 'Corporate',
    status: 'Active',
    investedCapital: 'R$ 120M',
    properties: 5,
    lastInteraction: '3 days ago'
  }
]

interface PartnersTableProps {
  partners?: Partner[]
}

export function PartnersTable({ partners = defaultPartners }: PartnersTableProps) {
  const statusStyles = {
    Active: 'bg-success-500/10 text-success-500',
    Pending: 'bg-amber-500/10 text-amber-500',
    Inactive: 'bg-slate-400/10 text-slate-400'
  }

  return (
    <Card padding='none'>
      <div className='p-6 border-b border-primary-500/5'>
        <h3 className='text-lg font-bold text-neutral-600 flex items-center gap-2'>
          <Icon name='groups' className='text-primary-500' />
          Active Partners
        </h3>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-xs'>
          <thead>
            <tr className='text-[10px] font-black uppercase tracking-widest text-neutral-600/40 border-b border-primary-500/5'>
              <th className='p-4 text-left'>Partner</th>
              <th className='p-4 text-left'>Type</th>
              <th className='p-4 text-left'>Status</th>
              <th className='p-4 text-right'>Invested Capital</th>
              <th className='p-4 text-right'>Properties</th>
              <th className='p-4 text-right'>Last Interaction</th>
              <th className='p-4 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr
                key={partner.id}
                className='border-b border-primary-500/5 last:border-b-0 hover:bg-primary-500/5 transition-colors'
              >
                <td className='p-4'>
                  <span className='font-bold text-neutral-600'>{partner.name}</span>
                </td>
                <td className='p-4 text-neutral-600/60'>{partner.type}</td>
                <td className='p-4'>
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-black ${statusStyles[partner.status]}`}
                  >
                    {partner.status}
                  </span>
                </td>
                <td className='p-4 text-right font-bold text-neutral-600'>
                  {partner.investedCapital}
                </td>
                <td className='p-4 text-right text-neutral-600/60'>{partner.properties}</td>
                <td className='p-4 text-right text-neutral-600/60'>{partner.lastInteraction}</td>
                <td className='p-4 text-center'>
                  <button
                    type='button'
                    className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors'
                  >
                    <Icon name='more_vert' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
