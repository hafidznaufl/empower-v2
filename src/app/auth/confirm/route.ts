import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import { createClient } from '~/utils/supabase/server'
import { db } from '~/server/db'
import { UserRole } from '@prisma/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error && data.user) {
      const metadata = data.user.user_metadata as {
        name?: string
        role?: UserRole
      }

      await db.user.upsert({
        where: {
          email: data.user.email!,
        },
        update: {},
        create: {
          id: data.user.id,
          email: data.user.email!,
          name: metadata.name ?? 'Unnamed User',
          role: metadata.role ?? 'CLIENT',
          password: '',
        },
      })

      redirect(next)
    }
  }

  redirect('/auth/auth-code-error')
}
