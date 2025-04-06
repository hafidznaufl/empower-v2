'use client'

import { useState, useEffect } from 'react'
import { type User } from '@supabase/supabase-js'
import { createClient } from '~/utils/supabase/client'

const supabase = createClient()

export function useClientUserSession() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(data.user ?? null)
      } catch (err) {
        console.error('Error fetching user:', err)
      }
    }

    fetchUser().catch(console.error)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
      },
    )

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  return user
}
