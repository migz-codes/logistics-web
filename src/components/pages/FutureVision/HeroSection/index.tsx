'use client'

import { Badge } from '@/components/shared/ui/Badge'
import { Icon } from '@/components/shared/ui/Icon'

export function HeroSection() {
    return (
        <header className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-earth via-earth/90 to-primary/20" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
                <Badge variant="featured" className="mb-8">
                    <Icon name="rocket_launch" size="sm" className="mr-2" />
                    2024 - 2030 Vision Roadmap
                </Badge>

                <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 leading-tight">
                    The Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                        Logistics Real Estate
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
                    We're pioneering the next generation of intelligent logistics infrastructure. Smart buildings, sustainable operations, and automated systems.
                </p>

                <div className="flex flex-wrap justify-center gap-8 text-white/60">
                    {[
                        { icon: 'smart_home', label: 'Smart Infrastructure' },
                        { icon: 'eco', label: 'Net Zero by 2030' },
                        { icon: 'precision_manufacturing', label: 'Full Automation' }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Icon name={item.icon} className="text-secondary" size="lg" />
                            <span className="font-bold uppercase tracking-wider text-sm">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/40 animate-bounce">
                <span className="text-xs font-bold uppercase tracking-widest mb-2">Explore</span>
                <Icon name="expand_more" />
            </div>
        </header>
    )
}
