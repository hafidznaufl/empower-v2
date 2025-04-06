'use server'

import { createClient } from '@supabase/supabase-js'
import { registerSchema } from './schemas'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS
  ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',')
  : []

export const registerAction = async (values: {
  name: string
  email: string
  password: string
}) => {
  const parsedData = registerSchema.safeParse(values)

  if (!parsedData.success) {
    return { success: false, message: 'Invalid input' }
  }

  const { name, email, password } = parsedData.data

  const role = ADMIN_EMAILS.map((email) => email.trim().toLowerCase()).includes(
    email.trim().toLowerCase(),
  )
    ? 'ADMIN'
    : 'CLIENT'

  const generateReferralCode = (name: string): string => {
    let namePart = name.replace(/\s+/g, '').substring(0, 6).toUpperCase()
    if (namePart.length < 6) {
      namePart = namePart.padEnd(6, 'X')
    }

    const randomNumber = Math.floor(1000 + Math.random() * 9000)

    return `${namePart}${randomNumber}`
  }

  const referralCode = generateReferralCode(name)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role, referralCode },
    },
  })

  if (error) {
    if (error.message.includes('User already registered')) {
      return {
        success: false,
        message: 'This email is already in use. Try logging in instead.',
      }
    }

    if (error.message.includes('Invalid email format')) {
      return { success: false, message: 'Please enter a valid email address.' }
    }

    if (error.message.includes('Password should be at least 6 characters')) {
      return {
        success: false,
        message: 'Your password must be at least 6 characters long.',
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
        message: 'Too many attempts. Please try again later.',
      }
    }

    if (error.message.includes('Network request failed')) {
      return {
        success: false,
        message:
          'Something went wrong. Please check your internet connection and try again.',
      }
    }

    if (error.message.includes('Email not confirmed')) {
      return {
        success: false,
        message:
          'Please verify your email address. Check your inbox for the confirmation link.',
      }
    }

    return { success: false, message: error.message }
  }

  return { success: true, user: data.user, message: 'Registration successful!' }
}
