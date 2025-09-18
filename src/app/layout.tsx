import '~/styles/globals.css'

import { Inter } from 'next/font/google'
import { type Metadata } from 'next'
import { TRPCReactProvider } from '~/trpc/react'
import { Toaster } from './_components/ui/sonner'
import { ThemeProvider } from './_components/theme-provider'
import RouteProtectLayout from './(client-public-pages)/_components/layout/route-protect-layout'
import { Suspense } from 'react'
import { SuspenseFallback } from './_components/skeletons/suspense-fallback'
import { env } from '~/env'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Empower – Report Violence Safely',
  description:
    'Empower is a secure and confidential platform for reporting incidents of all types of violence. Take action, stay safe, and let your voice be heard.',
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    title: 'Empower – Report Violence Safely',
    description:
      'Empower is a secure and confidential platform for reporting incidents of all types of violence. Take action, stay safe, and let your voice be heard.',
    url: env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Empower',
    images: [
      {
        url: '/image/sttnf.jpg',
        width: 1200,
        height: 630,
        alt: 'Empower App Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TRPCReactProvider>
          <Suspense fallback={<SuspenseFallback />}>
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
