'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
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

  return { success: true, users: users }
}
