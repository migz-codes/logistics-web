'use client'

import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'

export function CtaSection() {
    return (
        <section className="py-32 bg-gradient-to-br from-earth via-earth to-primary/40 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">
                    Ready to Join the <span className="text-secondary">Future</span>?
                </h2>
                <p className="text-xl text-white/80 mb-12 leading-relaxed">
                    Partner with us to build the next generation of logistics infrastructure. Whether you're an investor, developer, or operator, there's a place for you in our vision.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="shadow-2xl"
                        icon={<Icon name="handshake" />}
                        iconPosition="left"
                    >
                        Become a Partner
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-earth"
                        icon={<Icon name="calendar_month" />}
                        iconPosition="left"
                    >
                        Schedule a Consultation
                    </Button>
                </div>
            </div>
        </section>
    )
}
