import '~/styles/globals.css'

import { Inter } from 'next/font/google'
import { type Metadata } from 'next'
import { TRPCReactProvider } from '~/trpc/react'
import { Toaster } from './_components/ui/sonner'
import { ThemeProvider } from './_components/theme-provider'
import RouteProtectLayout from './(client-public-pages)/_components/layout/route-protect-layout'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Empower – Report Sexual Harassment Safely',
  description:
    'Empower is a secure and confidential platform for reporting incidents of sexual harassment. Take action, stay safe, and let your voice be heard.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TRPCReactProvider>
          <Suspense>
            <RouteProtectLayout>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </RouteProtectLayout>
          </Suspense>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
