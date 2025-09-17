'use server'

import { createClient } from '@supabase/supabase-js'
import { env } from '~/env'

const supabaseAdmin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
)

export async function getAllAuthUsersAction() {
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers()

  if (error) {
    console.error('Error fetching users:', error)
    return {
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    }
  }

  return { success: true, users }
}

export async function getUserByIdAction(userId: string) {
  const { data: user, error } =
    await supabaseAdmin.auth.admin.getUserById(userId)

  if (error) {
    console.error(`Error fetching user ${userId}:`, error)
    return {
      success: false,
      message: `Failed to fetch user with ID ${userId}`,
      error: error.message,
    }
  }

  return { success: true, user }
}

export async function updateUserRoleAction(userId: string, newRole: string) {
  const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      user_metadata: { role: newRole },
    },
  )

  if (error) {
    console.error(`Error updating role for user ${userId}:`, error)
    return {
      success: false,
      message: `Failed to update role for user with ID ${userId}`,
      error: error.message,
    }
  }

  return {
    success: true,
    message: `Successfully updated role to ${newRole}`,
    user,
  }
}
