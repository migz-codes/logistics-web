'use client'
import { useCallback, useEffect, useState } from 'react'
import { getSupabaseClient } from '@/services/supabase/client'

interface Property {
  id: string
  name: string
  accountable_id: string
  created_at: string
  updated_at: string
}

export const Test = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [properties, setProperties] = useState<Property[]>([])
  const [newPropertyName, setNewPropertyName] = useState('')
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [editPropertyName, setEditPropertyName] = useState('')

  const fetchProperties = useCallback(async () => {
    try {
      const supabase = getSupabaseClient()

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProperties(data || [])
    } catch (err) {
      setMessage(
        `Error fetching properties: ${err instanceof Error ? err.message : 'Unknown error'}`
      )
    }
  }, [])

  const addProperty = async () => {
    if (!newPropertyName.trim()) {
      setMessage('Property name cannot be empty')
      return
    }

    try {
      const supabase = getSupabaseClient()

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        setMessage('You must be logged in to add properties')
        return
      }

      const { data, error } = await supabase
        .from('properties')
        .insert({
          name: newPropertyName.trim(),
          accountable_id: user.id
        })
        .select()
        .single()

      if (error) throw error

      setProperties([data, ...properties])
      setNewPropertyName('')
      setMessage('Property added successfully!')
    } catch (err) {
      setMessage(`Error adding property: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const updateProperty = async () => {
    if (!editingProperty || !editPropertyName.trim()) {
      setMessage('Property name cannot be empty')
      return
    }

    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('properties')
        .update({ name: editPropertyName.trim() })
        .eq('id', editingProperty.id)
        .select()
        .single()

      if (error) throw error

      setProperties(properties.map((p) => (p.id === editingProperty.id ? data : p)))
      setEditingProperty(null)
      setEditPropertyName('')
      setMessage('Property updated successfully!')
    } catch (err) {
      setMessage(`Error updating property: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const deleteProperty = async (id: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from('properties').delete().eq('id', id)

      if (error) throw error

      setProperties(properties.filter((p) => p.id !== id))
      setMessage('Property deleted successfully!')
    } catch (err) {
      setMessage(`Error deleting property: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const startEdit = (property: Property) => {
    setEditingProperty(property)
    setEditPropertyName(property.name)
  }

  const cancelEdit = () => {
    setEditingProperty(null)
    setEditPropertyName('')
  }

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const onClick = async () => {
    setLoading(true)
    setMessage('')

    try {
      const supabase = getSupabaseClient()

      const { data, error } = await supabase.functions.invoke('hello', {
        body: { name: 'Test User' }
      })

      if (error) {
        const responseData = await error.context.json()
        setMessage(`Error: ${responseData.error.message}`)
      } else {
        setMessage(`${data.message} (User: ${data.user})`)
      }
    } catch (err) {
      setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='absolute top-0 z-50 left-0 p-4 bg-white shadow-lg rounded-lg max-w-2xl max-h-screen overflow-y-auto'>
      <div className='mb-4'>
        <button
          type='button'
          onClick={onClick}
          disabled={loading}
          className='px-4 py-2 bg-success-500 text-white rounded hover:bg-success-600 border-error-500'
        >
          {loading ? 'Loading...' : 'Test Edge Function'}
        </button>

        {message && <div className='mt-2 p-2 bg-gray-100 rounded text-sm'>{message}</div>}
      </div>

      <div className='border-t pt-4'>
        <h2 className='text-lg font-semibold mb-4'>Properties Management</h2>

        {/* Add Property Form */}
        <div className='mb-6'>
          <h3 className='text-md font-medium mb-2'>Add New Property</h3>
          <div className='flex gap-2'>
            <input
              type='text'
              value={newPropertyName}
              onChange={(e) => setNewPropertyName(e.target.value)}
              placeholder='Property name'
              className='flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              onKeyPress={(e) => e.key === 'Enter' && addProperty()}
            />

            <button
              type='button'
              onClick={addProperty}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Add
            </button>
          </div>
        </div>

        {/* Properties List */}
        <div>
          <h3 className='text-md font-medium mb-2'>Properties ({properties.length})</h3>
          <div className='space-y-2'>
            {properties.length === 0 ? (
              <p className='text-gray-500'>No properties found</p>
            ) : (
              properties.map((property) => (
                <div
                  key={property.id}
                  className='flex items-center justify-between p-3 border rounded hover:bg-gray-50'
                >
                  {editingProperty?.id === property.id ? (
                    <div className='flex-1 flex gap-2'>
                      <input
                        type='text'
                        value={editPropertyName}
                        onChange={(e) => setEditPropertyName(e.target.value)}
                        className='flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <button
                        type='button'
                        onClick={updateProperty}
                        className='px-3 py-1 bg-success-500 text-white rounded hover:bg-success-600 text-sm'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={cancelEdit}
                        className='px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm'
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className='flex-1'>
                        <div className='font-medium'>{property.name}</div>
                        <div className='text-xs text-gray-500'>
                          Created: {new Date(property.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          onClick={() => startEdit(property)}
                          className='px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm'
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() => deleteProperty(property.id)}
                          className='px-3 py-1 bg-error-500 text-white rounded hover:bg-error-600 text-sm'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
