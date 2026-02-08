'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/shared/layout/AdminSidebar'
import { FormStepper } from './FormStepper'
import { BasicInfoStep } from './BasicInfoStep'
import { TechnicalSpecsStep } from './TechnicalSpecsStep'
import { MediaStep } from './MediaStep'
import { ReviewStep } from './ReviewStep'

const sidebarLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'analytics', active: false },
    { href: '/admin/inventory', label: 'Inventory', icon: 'warehouse', active: false },
    { href: '/admin/partners', label: 'Partners', icon: 'handshake', active: false },
    { href: '/admin/properties', label: 'Properties', icon: 'domain', active: true },
    { href: '/admin/settings', label: 'Settings', icon: 'settings', active: false }
]

const steps = [
    { label: 'Basic Info', icon: 'info' },
    { label: 'Technical Specs', icon: 'analytics' },
    { label: 'Media', icon: 'image' },
    { label: 'Review', icon: 'check_circle' }
]

export function PropertyEditorPage() {
    const [currentStep, setCurrentStep] = useState(0)

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <BasicInfoStep onNext={handleNext} />
            case 1:
                return <TechnicalSpecsStep onNext={handleNext} onPrevious={handlePrevious} />
            case 2:
                return <MediaStep onNext={handleNext} onPrevious={handlePrevious} />
            case 3:
                return <ReviewStep onPrevious={handlePrevious} />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-cream dark:bg-background-dark flex">
            <AdminSidebar
                brandName="Logistics Portal"
                brandSubtitle="Property Editor"
                links={sidebarLinks}
            />

            <main className="flex-1 ml-64 p-8">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-earth dark:text-white flex items-center gap-3">
                        <span className="text-secondary">//</span>
                        Create New Property
                    </h1>
                    <p className="text-earth/50 dark:text-slate-400 font-medium mt-2">
                        Fill in all required information to add a new property to the inventory.
                    </p>
                </header>

                <FormStepper steps={steps} currentStep={currentStep} />

                <div className="mt-10">{renderStep()}</div>
            </main>
        </div>
    )
}
