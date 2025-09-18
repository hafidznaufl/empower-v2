'use client'

import '~/styles/globals.css'
import { Button } from '~/components/ui/button'
import { ChevronsLeft } from 'lucide-react'
import Image from 'next/image'
import LoginBackground from '~/public/image/authbackground.jpg'
import { useRouter } from 'next/navigation'
import { Badge } from '~/components/ui/badge'

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
            className="h-screen object-cover dark:brightness-[0.2] dark:grayscale"
            placeholder="blur"
          />
          <div className="absolute bottom-10 left-10 pr-14 text-white">
            <p className="text-xl">
              &quot;Designed in alignment with the values of Satgas PPKPT STT
              Terpadu Nurul Fikri, this application serves as a secure and
              empathetic space for survivors and witnesses to report incidents
              of any form of violence, reflecting the institution&rsquo;s
              commitment to a safe, respectful, and dignified campus
              environment.&quot;
            </p>
            <Badge className="mt-6">- Satgas PPKPT STTNF</Badge>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
