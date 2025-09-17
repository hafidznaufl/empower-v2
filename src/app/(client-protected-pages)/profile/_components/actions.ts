'use server'

import { createClient } from '@supabase/supabase-js'
import { updateEmailSchema } from './schemas'
import { env } from '~/env'

const supabaseAdmin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
)

export async function updateEmail(userId: string, newEmail: string) {
  const validated = updateEmailSchema.safeParse({ email: newEmail })
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0]?.message }
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    email: newEmail,
  })

  if (error) {
    console.error('Error updating email:', error)
    return { success: false, error: error.message }
  }

  const { error: otpError } = await supabaseAdmin.auth.signInWithOtp({
    email: newEmail,
  })

  if (otpError) {
    console.error('Error sending verification email:', otpError.message)
    return { success: false, error: otpError.message }
  }

  return { success: true }
}
