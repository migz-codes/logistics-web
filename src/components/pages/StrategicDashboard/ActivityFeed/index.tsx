'use client'

import { Button } from '@/components/shared/ui/Button'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

interface ActivityItem {
  id: string
  action: string
  description: string
  timestamp: string
  icon: string
  color: string
}

const defaultActivities: ActivityItem[] = [
  {
    id: '1',
    action: 'Property Listed',
    description: 'GLP Guarulhos DC is now live on the platform',
    timestamp: '15 min ago',
    icon: 'add_business',
    color: 'text-green-500'
  },
  {
    id: '2',
    action: 'Lead Captured',
    description: 'New inquiry for Prologis Industrial Park',
    timestamp: '1 hour ago',
    icon: 'person_add',
    color: 'text-primary'
  },
  {
    id: '3',
    action: 'Contract Signed',
    description: 'Cajamar Cold Storage - 5,500 m² leased',
    timestamp: '2 hours ago',
    icon: 'description',
    color: 'text-secondary'
  },
  {
    id: '4',
    action: 'Partner Onboarded',
    description: 'DHL Infrastructure joined as corporate partner',
    timestamp: '4 hours ago',
    icon: 'handshake',
    color: 'text-sage'
  },
  {
    id: '5',
    action: 'System Update',
    description: 'Platform maintenance completed successfully',
    timestamp: 'Yesterday',
    icon: 'system_update',
    color: 'text-earth/50'
  }
]

interface ActivityFeedProps {
  activities?: ActivityItem[]
}

export function ActivityFeed({ activities = defaultActivities }: ActivityFeedProps) {
  return (
    <Card>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-lg font-bold text-earth dark:text-white flex items-center gap-2'>
          <Icon name='history' className='text-primary' />
          Recent Activity
        </h3>
        <button className='text-xs font-bold text-primary hover:underline'>View All</button>
      </div>

      <div className='space-y-6'>
        {activities.map((activity, index) => (
          <div key={activity.id} className='flex gap-4'>
            {/* Timeline */}
            <div className='flex flex-col items-center'>
              <div
                className={`w-8 h-8 rounded-full bg-cream dark:bg-slate-800 flex items-center justify-center ${activity.color}`}
              >
                <Icon name={activity.icon} size='sm' />
              </div>
              {index < activities.length - 1 && <div className='w-px h-full bg-primary/10 mt-2' />}
            </div>
            {/* Content */}
            <div className='flex-1 pb-4'>
              <p className='font-bold text-sm text-earth dark:text-white'>{activity.action}</p>
              <p className='text-xs text-earth/60 dark:text-slate-400 mt-1'>
                {activity.description}
              </p>
              <p className='text-[10px] text-earth/40 dark:text-slate-500 mt-2'>
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
