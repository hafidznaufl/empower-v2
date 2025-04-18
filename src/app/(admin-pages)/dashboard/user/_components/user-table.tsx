'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '~/app/_components/tables/data-table'
import { FilePlus2 } from 'lucide-react'
import { type UserColumn } from './schema'
import { columns } from './column'
import { getAllAuthUsersAction } from './actions'
import TableSkeleton from '~/app/_components/skeletons/table-skeleton'

export default function UserTable() {
  const [users, setUsers] = useState<UserColumn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, users, message } = await getAllAuthUsersAction()

        if (!success || !users) {
          setError(message ?? 'An unknown error occurred.')
          return
        }

        const transformedUsers: UserColumn[] = users.map((user) => ({
          id: user.id,
          email: user.email ?? 'Unknown',
          emailVerified: user.user_metadata?.email_verified ?? 'N/A',
          name: user.user_metadata?.name ?? 'N/A',
          role:
            user.user_metadata?.role === 'ADMIN' ||
            user.user_metadata?.role === 'CLIENT'
              ? user.user_metadata.role
              : 'CLIENT',
          lastSignIn: user.last_sign_in_at ?? undefined,
          createdAt: user.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : 'Unknown',
        }))

        setUsers(transformedUsers)
      } catch (err) {
        setError('Error fetching users.')
        console.error('Error fetching users:', err)
      } finally {
        void setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <TableSkeleton />
  }

  if (error) {
    return <div className="text-center font-medium text-red-500">{error}</div>
  }

  return (
    <div className="mt-4 px-8">
      <DataTable
        columns={columns}
        data={users}
        placeholderFilter="Search by Email"
        columnFilterName="email"
        buttonContent="Create User"
        sheetTitle="Create a New User"
        sheetDescription="Fill in the form below to create a new user."
        sheetIcon={<FilePlus2 className="h-4 w-4" />}
        allowCreate={false}
        allowDelete={false}
      />
    </div>
  )
}
