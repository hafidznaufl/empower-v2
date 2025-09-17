'use client'

import '~/styles/globals.css'
import { Button } from '../_components/ui/button'
import { ChevronsLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ClientPrivateRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  return (
    <div>
      <main>
        <Button
          variant={'outline'}
          onClick={() => router.back()}
          className="fixed left-4 top-4 gap-2 rounded-xl bg-card transition-transform duration-300 ease-in-out md:left-8 md:top-8 md:h-16 md:w-16 md:rounded-3xl md:hover:translate-x-2"
        >
          <ChevronsLeft />
        </Button>
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  )
}
