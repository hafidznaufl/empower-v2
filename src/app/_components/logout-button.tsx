'use client'

import { createClient } from '~/utils/supabase/client'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface LogOutButtonProps {
  text?: boolean // Menampilkan teks "Log Out" atau tidak
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  redirectTo?: string
}

export default function LogOutButton({
  text = true,
  variant = 'default',
  size = 'default',
  redirectTo = '/',
}: LogOutButtonProps) {
  const supabase = createClient()
  const router = useRouter()

  const buttonSignOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error('Log out failed. Please try again later.')
    } else {
      toast.success('Successfully logged out.')
      router.push(redirectTo)
    }
  }

  return (
    <Button onClick={buttonSignOut} variant={variant} size={size}>
      <LogOut className="h-4 w-4" />
      {text && <span className="ml-2">Log Out</span>}
    </Button>
  )
}
