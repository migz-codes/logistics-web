import { Badge } from '@/components/shared/ui/Badge'
import { Icon } from '@/components/shared/ui/Icon'

interface Milestone {
  year: string
  title: string
  description: string
  icon: string
  status: 'completed' | 'current' | 'upcoming'
}

const milestones: Milestone[] = [
  {
    year: '2024',
    title: 'Smart Sensors Rollout',
    description:
      'IoT integration across all Class A warehouses for real-time monitoring of temperature, humidity, and occupancy.',
    icon: 'sensors',
    status: 'current'
  },
  {
    year: '2025',
    title: 'Solar Grid Expansion',
    description:
      '100% renewable energy across our portfolio with rooftop solar installations and battery storage.',
    icon: 'solar_power',
    status: 'upcoming'
  },
  {
    year: '2026',
    title: 'Autonomous Operations',
    description:
      'Self-driving forklifts and automated sorting systems in partnership with leading robotics companies.',
    icon: 'precision_manufacturing',
    status: 'upcoming'
  },
  {
    year: '2028',
    title: 'Digital Twin Platform',
    description:
      'Complete virtual replicas of all facilities for predictive maintenance and optimization.',
    icon: 'view_in_ar',
    status: 'upcoming'
  },
  {
    year: '2030',
    title: 'Net Zero Achievement',
    description: 'Full carbon neutrality across operations with verified carbon offset programs.',
    icon: 'eco',
    status: 'upcoming'
  }
]

export function RoadmapSection() {
  const statusStyles = {
    completed: 'bg-green-500 text-white',
    current: 'bg-secondary text-white ring-4 ring-secondary/30',
    upcoming: 'bg-cream text-earth/40'
  }

  return (
    <section className='py-32 bg-cream border-y border-primary/5'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-20'>
          <Badge variant='primary' className='mb-6'>
            Roadmap
          </Badge>
          <h2 className='text-4xl md:text-6xl font-extrabold text-earth mb-6'>
            Our Journey to the <span className='text-secondary italic font-light'>Future</span>
          </h2>
          <p className='text-earth/60 max-w-2xl mx-auto text-lg'>
            Strategic milestones driving the transformation of logistics infrastructure.
          </p>
        </div>

        <div className='relative'>
          {/* Timeline Line */}
          <div className='absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-primary to-sage' />

          {/* Milestones */}
          <div className='space-y-16'>
            {milestones.map((milestone, index) => (
              <div
                key={`${milestone.year}-${index}`}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Year Badge */}
                <div
                  className={`hidden md:flex w-5/12 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  <span className='text-6xl font-black text-earth/10'>{milestone.year}</span>
                </div>

                {/* Icon */}
                <div className='relative z-10'>
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${statusStyles[milestone.status]}`}
                  >
                    <Icon name={milestone.icon} size='lg' />
                  </div>
                </div>

                {/* Content */}
                <div className='flex-1 md:w-5/12'>
                  <div className='bg-white rounded-3xl p-8 shadow-xl border border-primary/5 hover:border-primary/20 transition-all hover:-translate-y-1'>
                    <span className='text-sm font-bold text-secondary md:hidden'>
                      {milestone.year}
                    </span>
                    <h3 className='text-xl font-bold text-earth mb-3'>{milestone.title}</h3>
                    <p className='text-earth/60 leading-relaxed'>{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
