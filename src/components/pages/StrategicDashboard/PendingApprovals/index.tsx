'use client'

import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { Card } from '@/components/shared/ui/Card'

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
        property: 'bg-primary/10 text-primary',
        partner: 'bg-secondary/10 text-secondary',
        investment: 'bg-sage/10 text-sage'
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-earth dark:text-white flex items-center gap-2">
                    <Icon name="pending_actions" className="text-secondary" />
                    Pending Approvals
                </h3>
                <span className="text-xs font-black text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                    {approvals.length} pending
                </span>
            </div>

            <div className="space-y-4">
                {approvals.map((approval) => (
                    <div
                        key={approval.id}
                        className="flex items-center gap-4 p-4 bg-cream dark:bg-slate-800 rounded-2xl hover:bg-primary/5 transition-colors group"
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[approval.type]}`}>
                            <Icon name={typeIcons[approval.type]} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm text-earth dark:text-white">
                                {approval.title}
                            </p>
                            <p className="text-xs text-earth/50 dark:text-slate-500">
                                by {approval.submitter} • {approval.date}
                            </p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                <Icon name="check" size="sm" />
                            </button>
                            <button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20">
                                <Icon name="close" size="sm" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Button variant="ghost" className="w-full mt-6 text-primary hover:bg-primary/5" size="sm">
                View All Pending Items
            </Button>
        </Card>
    )
}
