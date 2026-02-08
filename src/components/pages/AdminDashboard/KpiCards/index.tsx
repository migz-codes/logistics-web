'use client'

import { Icon } from '@/components/shared/ui/Icon'
import { Badge } from '@/components/shared/ui/Badge'

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
        icon: 'handshake',
        label: 'Active Partners',
        value: '42',
        change: '+2 this month',
        changeType: 'positive'
    },
    {
        icon: 'speed',
        label: 'Investments Pending',
        value: '7',
        change: 'Awaiting Approval',
        changeType: 'negative'
    },
    {
        icon: 'account_balance_wallet',
        label: 'Total Capital Pool',
        value: 'R$ 850M',
        change: '+12.5% YoY',
        changeType: 'positive'
    },
    {
        icon: 'domain',
        label: 'Total Managed Assets',
        value: '1,245,000',
        unit: 'm²',
        change: '+4.2%',
        changeType: 'positive'
    }
]

interface KpiCardsProps {
    kpis?: KpiItem[]
}

export function KpiCards({ kpis = defaultKpis }: KpiCardsProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-primary/5 shadow-sm hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Icon name={kpi.icon} size="lg" />
                        </div>
                        {kpi.change && (
                            <Badge variant={kpi.changeType === 'positive' ? 'success' : 'warning'} size="sm">
                                {kpi.change}
                            </Badge>
                        )}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-earth/40 dark:text-white/40">
                        {kpi.label}
                    </p>
                    <h3 className="text-2xl font-black mt-1 text-earth dark:text-white">
                        {kpi.value}
                        {kpi.unit && (
                            <span className="text-sm font-medium text-earth/50 ml-1">{kpi.unit}</span>
                        )}
                    </h3>
                </div>
            ))}
        </div>
    )
}
