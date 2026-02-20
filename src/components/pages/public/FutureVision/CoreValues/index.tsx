import { Icon } from '@/components/shared/ui/Icon'

interface Value {
  icon: string
  title: string
  description: string
  color: string
}

const values: Value[] = [
  {
    icon: 'lightbulb',
    title: 'Innovation',
    description:
      'Continuously pushing boundaries with cutting-edge technology and forward-thinking solutions.',
    color: 'bg-primary-500/10 text-primary-500'
  },
  {
    icon: 'eco',
    title: 'Sustainability',
    description:
      'Committed to environmental responsibility with net-zero goals and green building practices.',
    color: 'bg-success-500/10 text-success-500'
  },
  {
    icon: 'handshake',
    title: 'Partnership',
    description:
      'Building lasting relationships with investors, tenants, and communities we serve.',
    color: 'bg-secondary-500/10 text-secondary-500'
  },
  {
    icon: 'verified',
    title: 'Excellence',
    description: 'Maintaining the highest standards in every asset, service, and interaction.',
    color: 'bg-sage-500/10 text-sage-500'
  }
]

export function CoreValues() {
  return (
    <section className='py-32'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-20'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-neutral-600 mb-6'>
            Core <span className='text-primary-500 italic font-light'>Values</span>
          </h2>
          <p className='text-neutral-600/60 max-w-2xl mx-auto text-lg'>
            The principles that guide every decision we make.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {values.map((value) => (
            <div
              key={value.title}
              className='bg-white rounded-3xl p-8 border border-primary-500/5 hover:border-primary-500/20 transition-all hover:-translate-y-2 group'
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${value.color} group-hover:scale-110 transition-transform`}
              >
                <Icon name={value.icon} size='xl' />
              </div>
              <h3 className='text-xl font-bold text-neutral-600 mb-3'>{value.title}</h3>
              <p className='text-neutral-600/60 leading-relaxed'>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
