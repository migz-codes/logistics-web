'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { PageHeader } from '@/components/pages/private/shared/PageHeader'
import { Card } from '@/components/shared/ui/Card'
import { Icon } from '@/components/shared/ui/Icon'
import {
  GET_ALL_USERS_QUERY,
  type GetAllUsersResponse,
  type Role,
  UPDATE_USER_ROLE_MUTATION,
  type UpdateUserRoleResponse
} from '@/lib/apollo'
import { userAtoms } from '@/lib/store/user'
import { toast } from '@/lib/toast'

export function AllUsersPage() {
  const t = useTranslations('users')
  const router = useRouter()
  const isAdmin = useAtomValue(userAtoms.isAdmin)
  const currentUserId = useAtomValue(userAtoms.user)?.id

  const { data, loading, error, refetch } = useQuery<GetAllUsersResponse>(GET_ALL_USERS_QUERY, {
    skip: !isAdmin
  })

  const [updateRole] = useMutation<UpdateUserRoleResponse>(UPDATE_USER_ROLE_MUTATION)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/dashboard')
    }
  }, [isAdmin, router])

  useEffect(() => {
    if (error) {
      console.error('Error fetching users:', error)
    }
    if (data) {
      console.log('Users data:', data)
    }
  }, [error, data])

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      await updateRole({
        variables: { input: { userId, role: newRole } }
      })
      toast.success(t('roleUpdated'))
      refetch()
    } catch {
      toast.error(t('roleUpdateError'))
    }
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <PageHeader title={t('title')} description={t('subtitle')} />

      <Card variant='elevated'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center'>
            <Icon name='group' className='text-primary-500' size='lg' />
          </div>
          <div>
            <h2 className='text-lg font-bold text-neutral-600'>{t('listTitle')}</h2>
            <p className='text-sm text-neutral-600/60'>{t('listSubtitle')}</p>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <Icon name='progress_activity' className='text-primary-500 animate-spin' size='xl' />
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-neutral-200'>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.name')}
                  </th>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.email')}
                  </th>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.role')}
                  </th>
                  <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-600'>
                    {t('table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && data.getAllUsers && data.getAllUsers.length > 0 ? (
                  data.getAllUsers.map((user) => (
                    <tr key={user.id} className='border-b border-neutral-100 hover:bg-neutral-50'>
                      <td className='py-3 px-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 bg-primary-500/10 rounded-full flex items-center justify-center'>
                            <Icon name='person' className='text-primary-500' size='sm' />
                          </div>
                          <span className='text-sm font-medium text-neutral-600'>{user.name}</span>
                        </div>
                      </td>
                      <td className='py-3 px-4 text-sm text-neutral-600/80'>{user.email}</td>
                      <td className='py-3 px-4'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'ADMIN'
                              ? 'bg-secondary-500/10 text-secondary-600'
                              : 'bg-primary-500/10 text-primary-600'
                          }`}
                        >
                          {user.role === 'ADMIN' ? t('roles.admin') : t('roles.investor_admin')}
                        </span>
                      </td>
                      <td className='py-3 px-4'>
                        {user.id !== currentUserId && (
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                            className='text-sm border border-neutral-200 rounded-lg px-3 py-1.5 bg-white text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                          >
                            <option value='INVESTOR_ADMIN'>{t('roles.investor_admin')}</option>
                            <option value='ADMIN'>{t('roles.admin')}</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className='py-12 text-center'>
                      <div className='flex flex-col items-center gap-3'>
                        <Icon name='group' className='text-neutral-400' size='xl' />
                        <p className='text-sm text-neutral-500'>No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  )
}
