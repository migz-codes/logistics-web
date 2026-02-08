'use client'

import Image from 'next/image'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'

interface Property {
  id: string
  name: string
  image: string
  location: string
  region: string
  category: string
  area: string
  status: 'Available' | 'Leased' | 'Pending'
  price: string
}

const defaultProperties: Property[] = [
  {
    id: '1',
    name: 'Prologis Industrial Park - Section 4',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcKR8hM-rllk9n4fDVAv1yZ0s2dCnqZmdgZvVqDvhARcCMehqe5vH6Y2_43yo92RdWGBXCGsMZkmqDHfXNIMtrkA5QZS6nwsXcn-bE7trWl7VuzuezBG-02nJWcoagBvUnfZ06_O__rUF5g2sckccAsGEv36SvQWeAO4KPtuvp1g-FOkNg6fc3O8PQ9QxEKKa0AThg1rtnTHzSlCGuJ0IQgihrGluBrtYUebb7N3tOufK1fzr6XUjDyNmSIl5--x1LCNjD9nEF18',
    location: 'BR-116 km 28, Curitiba/PR',
    region: 'South',
    category: 'Class A Warehouse',
    area: '12,500 m²',
    status: 'Available',
    price: 'R$ 22.50/m²'
  },
  {
    id: '2',
    name: 'GLP Guarulhos DC',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuYEXj-i7PhFEfcbTeHMM3JMmYpiLkoWs898M2vjfQ-FbDZlaxdiGM36O7FHKUvyGd7dgn9vtDDmMyX5fR0aVy075mfAqWPyC1TjCq8j0vdz6obAme6bfCZ68HDSc3BgNYScHu3i9ReR5DwC1wQCJ9cXUJs3llPLUkDt97o8G2wY4yY3cvc296_paXHS5GwQicdWAF1WWgKEVXNe1nLzspwzbHOhVBBDE2H5nqyAKYjo-Lq7ZlOrc3tzJnvVQ27lHMQSLVOXpvDDM',
    location: 'Rod. Presidente Dutra, SP',
    region: 'Southeast',
    category: 'Cross-Docking',
    area: '8,000 m²',
    status: 'Leased',
    price: 'R$ 28.00/m²'
  },
  {
    id: '3',
    name: 'Cajamar Cold Storage Hub',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOa8d7BN6OttSwmAPIztKImxQB8rgSgZYGotKIb-PTro-Y-N_Do7h_x2iWE_h0WLLHCppjDWHEsbRUVsHe3LWoX1ibEgUxO6e3BJmUcSIOUYE2HPeQjRqHpiE4pXoIKzksZNNJNiVy9X3GZpmgLKJOfR2zCjIM3YamZ0z8dDR1m5of0KB162a_iq82d296NGc08KsggmcsDm6ysjyybBSgm5wpA6awrhJegXswdR2V83AFjzVIpcUqdr_Co6viBSAL4TZUZWB7uzo',
    location: 'Anhanguera km 32, Cajamar/SP',
    region: 'Southeast',
    category: 'Cold Storage',
    area: '5,500 m²',
    status: 'Pending',
    price: 'R$ 45.00/m²'
  }
]

interface InventoryTableProps {
  properties?: Property[]
}

export function InventoryTable({ properties = defaultProperties }: InventoryTableProps) {
  const statusStyles = {
    Available: 'bg-green-500/10 text-green-500',
    Leased: 'bg-secondary/10 text-secondary',
    Pending: 'bg-amber-500/10 text-amber-500'
  }

  return (
    <Card padding='none'>
      <div className='overflow-x-auto'>
        <table className='w-full text-xs'>
          <thead>
            <tr className='text-[10px] font-black uppercase tracking-widest text-earth/40 dark:text-slate-500 border-b border-primary/5'>
              <th className='p-4 text-left'>Property</th>
              <th className='p-4 text-left'>Region</th>
              <th className='p-4 text-left'>Category</th>
              <th className='p-4 text-right'>Area</th>
              <th className='p-4 text-center'>Status</th>
              <th className='p-4 text-right'>Price</th>
              <th className='p-4 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr
                key={property.id}
                className='border-b border-primary/5 last:border-b-0 hover:bg-primary/5 transition-colors'
              >
                <td className='p-4'>
                  <div className='flex items-center gap-3'>
                    <Image
                      width={64}
                      height={48}
                      alt={property.name}
                      src={property.image}
                      className='w-16 h-12 object-cover rounded-lg'
                    />

                    <div>
                      <p className='font-bold text-earth dark:text-white text-sm'>
                        {property.name}
                      </p>
                      <p className='text-earth/50 dark:text-slate-500 flex items-center gap-1'>
                        <Icon name='location_on' size='sm' />
                        {property.location}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='p-4 text-earth/60 dark:text-slate-400'>{property.region}</td>
                <td className='p-4 text-earth/60 dark:text-slate-400'>{property.category}</td>
                <td className='p-4 text-right font-bold text-earth dark:text-white'>
                  {property.area}
                </td>
                <td className='p-4 text-center'>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black ${statusStyles[property.status]}`}
                  >
                    {property.status}
                  </span>
                </td>
                <td className='p-4 text-right font-bold text-earth dark:text-white'>
                  {property.price}
                </td>

                <td className='p-4 text-center'>
                  <div className='flex items-center justify-center gap-2'>
                    <button
                      type='button'
                      className='p-2 rounded-lg hover:bg-primary/10 text-earth/40 hover:text-primary transition-colors'
                    >
                      <Icon name='visibility' />
                    </button>

                    <button
                      type='button'
                      className='p-2 rounded-lg hover:bg-primary/10 text-earth/40 hover:text-primary transition-colors'
                    >
                      <Icon name='edit' />
                    </button>

                    <button
                      type='button'
                      className='p-2 rounded-lg hover:bg-red-500/10 text-earth/40 hover:text-red-500 transition-colors'
                    >
                      <Icon name='delete' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='p-4 border-t border-primary/5 flex items-center justify-between'>
        <p className='text-xs text-earth/50 dark:text-slate-500'>Showing 1-3 of 42 properties</p>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='p-2 rounded-lg hover:bg-primary/10 text-earth/40 hover:text-primary transition-colors'
          >
            <Icon name='chevron_left' />
          </button>

          <button
            type='button'
            className='w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold'
          >
            1
          </button>

          <button
            type='button'
            className='w-8 h-8 rounded-lg hover:bg-primary/10 text-earth/60 text-xs font-bold'
          >
            2
          </button>

          <button
            type='button'
            className='w-8 h-8 rounded-lg hover:bg-primary/10 text-earth/60 text-xs font-bold'
          >
            3
          </button>

          <button
            type='button'
            className='p-2 rounded-lg hover:bg-primary/10 text-earth/40 hover:text-primary transition-colors'
          >
            <Icon name='chevron_right' />
          </button>
        </div>
      </div>
    </Card>
  )
}
