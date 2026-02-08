'use client'

import Link from 'next/link'
import { Icon } from '@/components/shared/ui/Icon'
import { cn } from '@/utils/cn'

interface SidebarLink {
    href: string
    label: string
    icon: string
    active?: boolean
}

interface SidebarProps {
    brandName?: string
    brandSubtitle?: string
    links?: SidebarLink[]
    systemStatus?: string
    systemStatusLabel?: string
}

export function AdminSidebar({
    brandName = 'Logistics Portal',
    brandSubtitle = 'Master Admin',
    links = [],
    systemStatus = 'operational',
    systemStatusLabel = 'Nodes Active'
}: SidebarProps) {
    const statusColors = {
        operational: 'bg-green-500',
        warning: 'bg-amber-500',
        error: 'bg-red-500'
    }

    return (
        <aside className="w-64 bg-earth text-white border-r border-earth-dark/20 flex flex-col fixed inset-y-0 z-50">
            {/* Brand */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 flex items-center justify-center rounded-lg rotate-3">
                        <Icon name="rocket_launch" className="text-white -rotate-3" size="md" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-extrabold text-sm tracking-tight text-white uppercase">
                            {brandName}
                        </span>
                        <span className="text-[8px] font-bold text-secondary tracking-[0.2em] uppercase">
                            {brandSubtitle}
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            'flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all',
                            link.active
                                ? 'text-white bg-white/10'
                                : 'text-white/50 hover:bg-white/5 hover:text-white'
                        )}
                    >
                        <Icon name={link.icon} size="md" />
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* System Status */}
            <div className="p-4 border-t border-white/10">
                <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">
                        System Status
                    </p>
                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                'w-2 h-2 rounded-full animate-pulse',
                                statusColors[systemStatus as keyof typeof statusColors] || statusColors.operational
                            )}
                        />
                        <span className="text-xs font-medium text-white/70">{systemStatusLabel}</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
