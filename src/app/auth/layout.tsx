'use client'

import '~/styles/globals.css'
import { Button } from '~/components/ui/button'
import { ChevronsLeft } from 'lucide-react'
import Image from 'next/image'
import LoginBackground from '~/public/image/authbackground.jpg'
import { useRouter } from 'next/navigation'
import { Badge } from '~/components/ui/badge'
import RouteProtectLayout from '../(client-public-pages)/_components/layout/route-protect-layout'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  return (
    <div>
      <div className="h-full min-h-screen w-full lg:grid lg:grid-cols-2">
        <Button
          variant={'outline'}
          onClick={() => router.push('/')}
          className="absolute left-8 top-8 z-10 hidden h-16 w-16 rounded-3xl transition-transform duration-300 ease-in-out hover:translate-x-2 md:flex"
        >
          <ChevronsLeft />
        </Button>
        <div className="relative hidden bg-muted lg:block">
          <Image
            src={LoginBackground}
            alt="Image"
            width="1920"
            height="1080"
            priority={true}
            className="h-screen object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute bottom-10 left-10 pr-14 text-white">
            <p className="text-xl">
              "Designed in alignment with the values of Satgas PPKS STT Terpadu
              Nurul Fikri, this application serves as a secure and empathetic
              space for survivors and witnesses to report incidents of sexual
              violence, reflecting the institution’s commitment to a safe and
              dignified campus environment."
            </p>
            <Badge className="mt-6">- Satgas PPKS STTNF</Badge>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
