'use server'

import { createClient } from '~/utils/supabase/server'
import { loginSchema } from './schemas'
import { serverClient } from '~/trpc/server'

export async function loginAction(values: { email: string; password: string }) {
  const supabase = await createClient()
  const parsedData = loginSchema.safeParse(values)
  const api = await serverClient()

  if (!parsedData.success) {
    return { success: false, message: 'Invalid input' }
  }

  const { email, password } = parsedData.data

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return {
        success: false,
        message: 'Account not found. Please sign up or check your credentials.',
      }
    }

    if (error.message.includes('Email not confirmed')) {
      return {
        success: false,
        message:
          'Please verify your account. Check your email for confirmation.',
      }
    }

    if (error.message.includes('User not found')) {
      return {
        success: false,
        message: 'Account not found. Please sign up first.',
      }
    }

    if (error.message.includes('Email and password are required')) {
      return {
        success: false,
        message: 'Please fill in both email and password fields.',
      }
    }

    if (error.message.includes('Too many requests')) {
      return {
        success: false,
        message: 'Too many failed attempts. Please wait and try again later.',
      }
    }

    if (error.message.includes('Network request failed')) {
      return {
        success: false,
        message:
          'Something went wrong. Please check your internet connection and try again.',
      }
    }

    if (error.message.includes('Session expired')) {
      return {
        success: false,
        message: 'Your session has expired. Please log in again.',
      }
    }

    return { success: false, message: error.message }
  }

  await api.user.create({
    id: data.user?.id!,
    email: data.user?.email ?? '',
    name: data.user?.user_metadata?.name ?? 'Unnamed User',
    role: data.user?.user_metadata?.role ?? 'CLIENT',
  })

  const { data: session } = await supabase.auth.getSession()

  return {
    success: true,
    user: data.user,
    session,
    redirectTo: data.user?.user_metadata?.role === 'ADMIN' ? '/dashboard' : '/',
  }
}

export async function getUser() {
  const supabase = await createClient()
  const { data: session } = await supabase.auth.getSession()

  if (!session?.session) {
    return { success: false, user: null }
  }

  return { success: true, user: session.session.user }
}
