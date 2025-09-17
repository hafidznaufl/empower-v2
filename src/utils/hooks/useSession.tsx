'use client'

import { useState, useEffect } from 'react'
import { type Session } from '@supabase/supabase-js'
import { createClient } from '~/utils/supabase/client'

const supabaseClient = createClient()
const supabaseServer = createClient()

export function useClientSession() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession()
      setSession(session)
    }

    void fetchSession()

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession)
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return session
}

export function useServerSession() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabaseServer.auth.getSession()
      setSession(session)
    }

    void fetchSession()

    const { data: authListener } = supabaseServer.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession)
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return session
}
