'use server'

import { createClient } from '@supabase/supabase-js'
import { resetPasswordSchema } from './schemas'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function resetPassword(formData: { email: string }) {
  const parsedData = resetPasswordSchema.safeParse(formData)
  if (!parsedData.success) {
    return { success: false, message: parsedData.error.errors[0]?.message }
  }

  const { email } = parsedData.data
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update-password`,
  })

  if (error) {
    if (error.message.includes('User not found')) {
      return {
        success: false,
        message:
          "We couldn't find an account with that email. Please sign up first.",
      }
    }

    if (error.message.includes('Email not confirmed')) {
      return {
        success: false,
        message: 'Please verify your email before resetting your password.',
      }
    }

    if (error.message.includes('Too many requests')) {
      return {
        success: false,
        message:
          "You've requested a password reset too many times. Please wait and try again later.",
      }
    }

    if (error.message.includes('Invalid email format')) {
      return { success: false, message: 'Please enter a valid email address.' }
    }

    if (error.message.includes('Email is required')) {
      return {
        success: false,
        message: 'Please enter your email to receive a password reset link.',
      }
    }

    if (error.message.includes('Network request failed')) {
      return {
        success: false,
        message:
          'Something went wrong. Please check your internet connection and try again.',
      }
    }

    if (
      error.message.includes('Token expired') ||
      error.message.includes('invalid')
    ) {
      return {
        success: false,
        message:
          'The password reset link is invalid or has expired. Please request a new one.',
      }
    }

    return { success: false, message: error.message }
  }

  return { success: true, message: 'Password reset email sent successfully' }
}
