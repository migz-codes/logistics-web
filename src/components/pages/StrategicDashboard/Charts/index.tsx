'use client'

import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

export function Charts() {
  return (
    <div className='grid lg:grid-cols-2 gap-8 mt-8'>
      {/* Lead Growth Chart */}
      <Card>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-bold text-earth dark:text-white flex items-center gap-2'>
            <Icon name='show_chart' className='text-primary' />
            Lead Growth Trend
          </h3>
          <select className='text-xs font-bold bg-cream dark:bg-slate-800 rounded-lg px-3 py-2 border-none'>
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>YTD</option>
          </select>
        </div>
        {/* Chart Placeholder */}
        <div className='h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl flex items-end justify-center gap-4 p-6'>
          {[65, 45, 80, 55, 90, 70].map((height, index) => (
            <div
              key={index}
              className='w-12 bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all hover:scale-105'
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className='flex justify-between mt-4 text-xs text-earth/50 dark:text-slate-500 font-bold'>
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>
      </Card>

      {/* Portfolio Distribution */}
      <Card>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-bold text-earth dark:text-white flex items-center gap-2'>
            <Icon name='pie_chart' className='text-primary' />
            Portfolio by Category
          </h3>
        </div>
        {/* Donut Chart Placeholder */}
        <div className='flex items-center justify-center mb-6'>
          <div className='relative'>
            <svg className='w-48 h-48' viewBox='0 0 100 100'>
              <circle
                className='stroke-primary/20'
                cx='50'
                cy='50'
                r='40'
                fill='none'
                strokeWidth='12'
              />
              <circle
                className='stroke-primary'
                cx='50'
                cy='50'
                r='40'
                fill='none'
                strokeWidth='12'
                strokeDasharray='163'
                strokeDashoffset='57'
                strokeLinecap='round'
                transform='rotate(-90 50 50)'
              />
              <circle
                className='stroke-secondary'
                cx='50'
                cy='50'
                r='40'
                fill='none'
                strokeWidth='12'
                strokeDasharray='163'
                strokeDashoffset='130'
                strokeLinecap='round'
                transform='rotate(45 50 50)'
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center'>
                <span className='text-2xl font-black text-earth dark:text-white'>156</span>
                <p className='text-[10px] text-earth/50 dark:text-slate-500 uppercase tracking-widest'>
                  Properties
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className='space-y-3'>
          {[
            { label: 'Class A Warehouse', value: '65%', color: 'bg-primary' },
            { label: 'Cross-Docking Hub', value: '20%', color: 'bg-secondary' },
            { label: 'Cold Storage', value: '10%', color: 'bg-sage' },
            { label: 'Last-Mile Center', value: '5%', color: 'bg-earth' }
          ].map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className='text-xs text-earth/60 dark:text-slate-400 flex-1'>{item.label}</span>
              <span className='text-xs font-bold text-earth dark:text-white'>{item.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
