'use client'

import { Badge } from '@/components/shared/ui/Badge'
import { Icon } from '@/components/shared/ui/Icon'

interface PropertyHeaderProps {
    title?: string
    location?: string
    category?: string
    status?: string
}

export function PropertyHeader({
    title = 'Prologis Industrial Park - Section 4',
    location = 'Highway BR-116, km 28 - Southern Industrial Zone, Curitiba/PR',
    category = 'Industrial Logistics',
    status = 'Available Now'
}: PropertyHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary">{category}</Badge>
                <Badge variant="secondary">{status}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-earth dark:text-white mb-2">
                {title}
            </h1>
            <div className="flex items-center gap-2 text-earth/60 dark:text-slate-400">
                <Icon name="location_on" className="text-secondary" />
                <span className="font-medium">{location}</span>
            </div>
        </div>
    )
}
