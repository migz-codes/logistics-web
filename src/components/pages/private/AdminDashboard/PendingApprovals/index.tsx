'use client'

import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

interface ApprovalItem {
  id: string
  type: 'property' | 'partner' | 'investment'
  title: string
  submitter: string
  date: string
}

const defaultApprovals: ApprovalItem[] = [
  {
    id: '1',
    type: 'property',
    title: 'New Warehouse Listing - Sorocaba',
    submitter: 'João Silva',
    date: '2 hours ago'
  },
  {
    id: '2',
    type: 'partner',
    title: 'Partnership Request - DHL Logistics',
    submitter: 'System',
    date: '5 hours ago'
  },
  {
    id: '3',
    type: 'investment',
    title: 'Investment Proposal - R$ 50M',
    submitter: 'Blackstone Ventures',
    date: '1 day ago'
  }
]

interface PendingApprovalsProps {
  approvals?: ApprovalItem[]
}

export function PendingApprovals({ approvals = defaultApprovals }: PendingApprovalsProps) {
  const typeIcons = {
    property: 'domain',
    partner: 'handshake',
    investment: 'account_balance'
  }

  const typeColors = {
    property: 'bg-primary-500/10 text-primary-500',
    partner: 'bg-secondary-500/10 text-secondary-500',
    investment: 'bg-sage-500/10 text-sage-500'
  }

  return (
    <Card>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-lg font-bold text-neutral-600 flex items-center gap-2'>
          <Icon name='pending_actions' className='text-secondary-500' />
          Pending Approvals
        </h3>
        <span className='text-xs font-black text-secondary-500 bg-secondary-500/10 px-3 py-1 rounded-full'>
          {approvals.length} pending
        </span>
      </div>

      <div className='space-y-4'>
        {approvals.map((approval) => (
          <div
            key={approval.id}
            className='flex items-center gap-4 p-4 bg-surface-200 rounded-2xl hover:bg-primary-500/5 transition-colors group'
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[approval.type]}`}
            >
              <Icon name={typeIcons[approval.type]} />
            </div>
            <div className='flex-1'>
              <p className='font-bold text-sm text-neutral-600'>{approval.title}</p>
              <p className='text-xs text-neutral-600/50'>
                by {approval.submitter} • {approval.date}
              </p>
            </div>
            <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
              <button
                type='button'
                className='p-2 rounded-lg bg-success-500/10 text-success-500 hover:bg-success-500/20'
              >
                <Icon name='check' size='sm' />
              </button>
              <button
                type='button'
                className='p-2 rounded-lg bg-error-500/10 text-error-500 hover:bg-error-500/20'
              >
                <Icon name='close' size='sm' />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button variant='ghost' className='w-full mt-6 text-primary-500 hover:bg-primary-500/5' size='sm'>
        View All Pending Items
      </Button>
    </Card>
  )
}
