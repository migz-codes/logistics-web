'use client'

import Image from 'next/image'
import { Icon } from '@/components/shared/ui/Icon'
import { getSupabaseClient } from '@/services/supabase/client'
import { usePropertiesContext } from '../../context'

export const Properties = () => {
  const { loading, error, properties } = usePropertiesContext()

  const deleteProperty = async (id: string) => {
    try {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from('properties').delete().eq('id', id)

      if (error) {
        throw error
      }
    } catch (err) {
      console.error('Error deleting property:', err)
      throw err
    }
  }

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={7} className='p-8 text-center text-neutral-600/50'>
            Loading properties...
          </td>
        </tr>
      </tbody>
    )
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={7} className='p-8 text-center text-error-500'>
            Error: {error}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {properties.map((property) => (
        <tr
          key={property.id}
          className='border-b border-primary-500/5 last:border-b-0 hover:bg-primary-500/5 transition-colors'
        >
          <td className='p-4'>
            <div className='flex items-center gap-3'>
              <Image
                width={64}
                height={48}
                alt={property.title || property.title || 'Property'}
                src={property.image ?? '/placeholder-property.jpg'}
                className='w-16 h-12 object-cover rounded-lg'
              />

              <div>
                <p className='font-bold text-neutral-600 text-sm'>{property.title}</p>

                <p className='text-neutral-600/50 flex items-center gap-1'>
                  <Icon name='location_on' size='sm' />

                  <span>{`${property.address}`}</span>
                </p>
              </div>
            </div>
          </td>
          <td className='p-4 text-neutral-600/60'>{property.country}</td>

          <td className='p-4 text-neutral-600/60'>
            {property.state}/{property.city}
          </td>

          <td className='p-4 text-right font-bold text-neutral-600'>{property.area}</td>

          <td className='p-4 text-center'>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black ${
                property.status === 'Available'
                  ? 'bg-success-500/10 text-success-500'
                  : property.status === 'Leased'
                    ? 'bg-secondary-500/10 text-secondary-500'
                    : 'bg-amber-500/10 text-amber-500'
              }`}
            >
              {property.status}
            </span>
          </td>
          <td className='p-4 text-right font-bold text-neutral-600'>{property.price}</td>

          <td className='p-4 text-center'>
            <div className='flex items-center justify-center gap-2'>
              <button
                type='button'
                className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors'
              >
                <Icon name='visibility' />
              </button>

              <button
                type='button'
                className='p-2 rounded-lg hover:bg-primary-500/10 text-neutral-600/40 hover:text-primary-500 transition-colors'
              >
                <Icon name='edit' />
              </button>

              <button
                type='button'
                onClick={() => deleteProperty(property.id)}
                className='p-2 rounded-lg hover:bg-error-500/10 text-neutral-600/40 hover:text-error-500 transition-colors'
              >
                <Icon name='delete' />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
