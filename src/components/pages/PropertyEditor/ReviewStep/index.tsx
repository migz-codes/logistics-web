'use client'

import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { Card } from '@/components/shared/ui/Card'
import { Badge } from '@/components/shared/ui/Badge'

interface ReviewStepProps {
    onPrevious: () => void
}

export function ReviewStep({ onPrevious }: ReviewStepProps) {
    return (
        <Card variant="elevated">
            <h2 className="text-2xl font-bold text-earth dark:text-white mb-8 flex items-center gap-3">
                <Icon name="check_circle" className="text-primary" />
                Review & Submit
            </h2>

            <div className="space-y-8">
                {/* Property Preview */}
                <div className="bg-cream dark:bg-slate-800 rounded-2xl p-6">
                    <div className="flex items-start gap-6">
                        <div className="w-32 h-24 bg-slate-300 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                            <Icon name="image" className="text-slate-400" size="xl" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="primary">Class A Warehouse</Badge>
                                <Badge variant="success">Draft</Badge>
                            </div>
                            <h3 className="text-xl font-bold text-earth dark:text-white">
                                [Property Name]
                            </h3>
                            <p className="text-sm text-earth/60 dark:text-slate-400 flex items-center gap-1 mt-1">
                                <Icon name="location_on" size="sm" />
                                [Address will appear here]
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-earth dark:text-white">
                                R$ --/m²
                            </p>
                            <p className="text-sm text-earth/50 dark:text-slate-500">
                                -- m² total
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section Summaries */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Basic Info */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/5">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-earth dark:text-white flex items-center gap-2">
                                <Icon name="info" className="text-primary" size="sm" />
                                Basic Info
                            </h4>
                            <button className="text-primary text-xs font-bold hover:underline">
                                Edit
                            </button>
                        </div>
                        <div className="space-y-2 text-xs text-earth/60 dark:text-slate-400">
                            <p>• Category: --</p>
                            <p>• Region: --</p>
                            <p>• Available from: --</p>
                        </div>
                    </div>

                    {/* Technical Specs */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/5">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-earth dark:text-white flex items-center gap-2">
                                <Icon name="analytics" className="text-primary" size="sm" />
                                Technical
                            </h4>
                            <button className="text-primary text-xs font-bold hover:underline">
                                Edit
                            </button>
                        </div>
                        <div className="space-y-2 text-xs text-earth/60 dark:text-slate-400">
                            <p>• Ceiling: -- m</p>
                            <p>• Docks: --</p>
                            <p>• Power: -- kVA</p>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/5">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-earth dark:text-white flex items-center gap-2">
                                <Icon name="image" className="text-primary" size="sm" />
                                Media
                            </h4>
                            <button className="text-primary text-xs font-bold hover:underline">
                                Edit
                            </button>
                        </div>
                        <div className="space-y-2 text-xs text-earth/60 dark:text-slate-400">
                            <p>• Photos: 0/20</p>
                            <p>• Floor plan: Not uploaded</p>
                            <p>• Video: Not linked</p>
                        </div>
                    </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10 cursor-pointer">
                    <input
                        type="checkbox"
                        className="w-5 h-5 rounded text-primary focus:ring-primary mt-0.5"
                    />
                    <div>
                        <p className="font-bold text-earth dark:text-white mb-1">
                            I confirm all information is accurate
                        </p>
                        <p className="text-sm text-earth/60 dark:text-slate-400">
                            By submitting, I agree that the property details are correct and can be published on the platform.
                        </p>
                    </div>
                </label>

                <div className="flex justify-between pt-6 border-t border-primary/5">
                    <Button
                        variant="outline"
                        icon={<Icon name="arrow_back" />}
                        iconPosition="left"
                        onClick={onPrevious}
                        type="button"
                    >
                        Previous
                    </Button>
                    <div className="flex gap-4">
                        <Button variant="outline" icon={<Icon name="save" />} iconPosition="left">
                            Save as Draft
                        </Button>
                        <Button
                            variant="primary"
                            icon={<Icon name="publish" />}
                            type="submit"
                        >
                            Publish Property
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
