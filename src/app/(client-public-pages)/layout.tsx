'use client'

import '~/styles/globals.css'
import Navbar from '~/components/navbar'
import { MotionLayout } from './_components/layout/motion-layout'
import { cn } from '~/utils/cn'
import { AnimatedGridPattern } from '../_components/ui/animated-grid-pattern'

export default function ClientPublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      <main>
        <AnimatedGridPattern
          numSquares={2}
          maxOpacity={0.2}
          duration={2}
          repeatDelay={5}
          className={cn(
            '[mask-image:radial-gradient(800px_circle_at_top,white,transparent)]',
            'fixed -z-10 mt-[57px] hidden md:flex',
          )}
        />
        <AnimatedGridPattern
          numSquares={2}
          maxOpacity={0.2}
          duration={2}
          repeatDelay={5}
          className={cn(
            '[mask-image:radial-gradient(400px_circle_at_top,white,transparent)]',
            'fixed -z-10 mt-[57px] md:hidden',
          )}
        />
        <MotionLayout>{children}</MotionLayout>
      </main>
    </div>
  )
}
