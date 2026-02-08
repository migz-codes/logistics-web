'use client'

import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { Input } from '@/components/shared/ui/Input'
import { Select } from '@/components/shared/ui/Select'
import { Textarea } from '@/components/shared/ui/Textarea'
import { Card } from '@/components/shared/ui/Card'

interface BasicInfoStepProps {
    onNext: () => void
}

export function BasicInfoStep({ onNext }: BasicInfoStepProps) {
    const categoryOptions = [
        { value: '', label: 'Select Category' },
        { value: 'warehouse', label: 'Class A Warehouse' },
        { value: 'cold-storage', label: 'Cold Storage' },
        { value: 'cross-dock', label: 'Cross-Docking Hub' },
        { value: 'last-mile', label: 'Last-Mile Center' }
    ]

    const regionOptions = [
        { value: '', label: 'Select Region' },
        { value: 'southeast', label: 'Southeast' },
        { value: 'south', label: 'South' },
        { value: 'northeast', label: 'Northeast' },
        { value: 'midwest', label: 'Midwest' },
        { value: 'north', label: 'North' }
    ]

    return (
        <Card variant="elevated">
            <h2 className="text-2xl font-bold text-earth dark:text-white mb-8 flex items-center gap-3">
                <Icon name="info" className="text-primary" />
                Basic Information
            </h2>

            <form className="space-y-6">
                <Input label="Property Name" placeholder="e.g., Prologis Industrial Park - Section 4" />

                <div className="grid md:grid-cols-2 gap-6">
                    <Select label="Category" options={categoryOptions} />
                    <Select label="Region" options={regionOptions} />
                </div>

                <Textarea
                    label="Address"
                    placeholder="Full property address including city, state, and ZIP code"
                    rows={2}
                />

                <Textarea
                    label="Description"
                    placeholder="Describe the property features, highlights, and unique selling points..."
                    rows={4}
                />

                <div className="grid md:grid-cols-3 gap-6">
                    <Input label="Total Area (m²)" placeholder="e.g., 12500" type="number" />
                    <Input label="Lease Price (R$/m²)" placeholder="e.g., 22.50" type="number" />
                    <Input label="Available From" type="date" />
                </div>

                <div className="flex justify-end pt-6 border-t border-primary/5">
                    <Button
                        variant="primary"
                        icon={<Icon name="arrow_forward" />}
                        onClick={onNext}
                        type="button"
                    >
                        Next: Technical Specs
                    </Button>
                </div>
            </form>
        </Card>
    )
}
