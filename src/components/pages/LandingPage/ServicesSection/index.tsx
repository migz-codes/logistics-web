'use client'

import { Badge } from '@/components/shared/ui/Badge'
import { Button } from '@/components/shared/ui/Button'
import { Icon } from '@/components/shared/ui/Icon'

interface Service {
    icon: string
    title: string
    description: string
    features: string[]
}

const defaultServices: Service[] = [
    {
        icon: 'home_work',
        title: 'Buy Property',
        description: 'Find your perfect home from our extensive collection of premium properties.',
        features: ['Expert guidance', 'Market analysis', 'Negotiation support']
    },
    {
        icon: 'sell',
        title: 'Sell Property',
        description: 'Get the best value for your property with our comprehensive selling services.',
        features: ['Free valuation', 'Marketing strategy', 'Professional staging']
    },
    {
        icon: 'real_estate_agent',
        title: 'Property Management',
        description: 'Let us handle your property while you enjoy hassle-free ownership.',
        features: ['Tenant screening', 'Rent collection', 'Maintenance coordination']
    }
]

interface ServicesSectionProps {
    services?: Service[]
}

export function ServicesSection({ services = defaultServices }: ServicesSectionProps) {
    return (
        <section className="py-32 px-6 bg-white border-y border-primary/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <Badge variant="primary" className="mb-6">Our Services</Badge>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-earth mb-6">
                        What We <span className="text-secondary italic font-light">Offer</span>
                    </h2>
                    <p className="text-earth/60 max-w-2xl mx-auto text-lg">
                        Comprehensive real estate services tailored to meet your unique needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-cream rounded-3xl p-10 hover:bg-white hover:shadow-2xl transition-all group border border-primary/5"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all">
                                <Icon name={service.icon} className="text-primary group-hover:text-white" size="xl" />
                            </div>

                            <h3 className="text-2xl font-bold text-earth mb-4">
                                {service.title}
                            </h3>

                            <p className="text-earth/60 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-earth/70">
                                        <Icon name="check_circle" size="sm" className="text-sage" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button variant="ghost" icon={<Icon name="arrow_forward" />}>
                                Learn More
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
