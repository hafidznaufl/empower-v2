'use server'

import { createClient } from '@supabase/supabase-js'
import { updatePasswordSchema } from './schemas'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
)

export async function updatePassword({
  newPassword,
  confirmPassword,
  userId,
}: {
  newPassword: string
  confirmPassword: string
  userId: string
}) {
  const parsedData = updatePasswordSchema.safeParse({
    newPassword,
    confirmPassword,
  })
  if (!parsedData.success) {
    return { success: false, message: parsedData.error.errors[0]?.message }
  }

  if (!userId) {
    return { success: false, message: 'User ID is missing.' }
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: newPassword,
  })

  if (error) {
    if (error.message.includes('Password should be at least 6 characters')) {
      return {
        success: false,
        message: 'Your password must be at least 6 characters long.',
      }
    }

    if (error.message.includes('Password is required')) {
      return { success: false, message: 'Please enter a new password.' }
    }

    if (
      error.message.includes(
        'New password must be different from the old password',
      )
    ) {
      return {
        success: false,
        message:
          'Your new password must be different from your current password.',
      }
    }

    if (error.message.includes('Too many requests')) {
      return {
        success: false,
        message:
          "You've tried updating your password too many times. Please wait and try again later.",
      }
    }

    if (error.message.includes('Network request failed')) {
      return {
        success: false,
        message:
          'Something went wrong. Please check your internet connection and try again.',
      }
    }

    console.log({ success: false, message: error.message })

    return { success: false, message: error.message }
  }

  return { success: true, message: 'Password updated successfully' }
}
