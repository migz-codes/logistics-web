'use client'

import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'
import { Card } from '@/components/shared/ui/Card'

interface MediaStepProps {
    onNext: () => void
    onPrevious: () => void
}

export function MediaStep({ onNext, onPrevious }: MediaStepProps) {
    return (
        <Card variant="elevated">
            <h2 className="text-2xl font-bold text-earth dark:text-white mb-8 flex items-center gap-3">
                <Icon name="image" className="text-primary" />
                Media & Gallery
            </h2>

            <div className="space-y-8">
                {/* Main Photo Upload */}
                <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                        Main Photo
                    </h3>
                    <div className="border-2 border-dashed border-primary/20 rounded-2xl p-12 text-center hover:border-primary/40 transition-colors cursor-pointer bg-cream dark:bg-slate-800">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                            <Icon name="cloud_upload" className="text-primary" size="xl" />
                        </div>
                        <p className="font-bold text-earth dark:text-white mb-2">
                            Drag & drop your main photo here
                        </p>
                        <p className="text-sm text-earth/60 dark:text-slate-400 mb-4">
                            or click to browse files (JPG, PNG up to 10MB)
                        </p>
                        <Button variant="outline" size="sm">
                            Browse Files
                        </Button>
                    </div>
                </div>

                {/* Gallery Upload */}
                <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                        Gallery Photos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((index) => (
                            <div
                                key={index}
                                className="aspect-video border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center hover:border-primary/40 transition-colors cursor-pointer bg-cream dark:bg-slate-800"
                            >
                                <Icon name="add_photo_alternate" className="text-primary/40" size="xl" />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-earth/50 dark:text-slate-500 mt-3">
                        Upload up to 20 gallery photos. Recommended: 1920×1080px
                    </p>
                </div>

                {/* Floor Plan Upload */}
                <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                        Floor Plan
                    </h3>
                    <div className="border-2 border-dashed border-primary/20 rounded-2xl p-8 flex items-center gap-6 hover:border-primary/40 transition-colors cursor-pointer bg-cream dark:bg-slate-800">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Icon name="layers" className="text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-earth dark:text-white">Upload Floor Plan</p>
                            <p className="text-sm text-earth/60 dark:text-slate-400">
                                PDF or high-resolution image
                            </p>
                        </div>
                        <Button variant="outline" size="sm">
                            Upload
                        </Button>
                    </div>
                </div>

                {/* Video/Virtual Tour */}
                <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                        Virtual Tour / Video
                    </h3>
                    <div className="bg-cream dark:bg-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Icon name="videocam" className="text-primary" />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="url"
                                    placeholder="Paste YouTube, Vimeo, or Matterport link..."
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-700 border-none focus:ring-2 focus:ring-primary text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

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
                    <Button
                        variant="primary"
                        icon={<Icon name="arrow_forward" />}
                        onClick={onNext}
                        type="button"
                    >
                        Next: Review
                    </Button>
                </div>
            </div>
        </Card>
    )
}
