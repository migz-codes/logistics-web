'use client'

import { Icon } from '@/components/shared/ui/Icon'
import { Select } from '@/components/shared/ui/Select'

export function InventoryFilters() {
    const regionOptions = [
        { value: '', label: 'All Regions' },
        { value: 'southeast', label: 'Southeast' },
        { value: 'south', label: 'South' },
        { value: 'northeast', label: 'Northeast' }
    ]

    const categoryOptions = [
        { value: '', label: 'All Categories' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'cold-storage', label: 'Cold Storage' },
        { value: 'cross-dock', label: 'Cross-Dock' }
    ]

    const statusOptions = [
        { value: '', label: 'All Status' },
        { value: 'available', label: 'Available' },
        { value: 'leased', label: 'Leased' },
        { value: 'under-construction', label: 'Under Construction' }
    ]

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 mb-6 border border-primary/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                    <Icon
                        name="search"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-earth/40"
                    />
                    <input
                        type="text"
                        placeholder="Search properties..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-cream dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-sm font-medium"
                    />
                </div>

                <Select options={regionOptions} className="text-sm" />
                <Select options={categoryOptions} className="text-sm" />
                <Select options={statusOptions} className="text-sm" />
            </div>
        </div>
    )
}
