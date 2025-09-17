import { Home, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/app/_components/ui/button'
import Sidebar from '~/components/sidebar'
import { ScrollArea } from '~/components/ui/scroll-area'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed inset-0 mx-2 flex flex-col items-center justify-center gap-6 p-4 text-muted-foreground sm:hidden">
        <TriangleAlert className="h-28 w-28 animate-pulse text-primary" />
        <p className="t text-center">
          The dashboard is not accessible on mobile view. Please use a larger
          screen for a better experience.
        </p>
        <Link href={'/'}>
          <Button>
            <Home className="h-4 w-4" />
            Back To Home
          </Button>
        </Link>
      </div>
      <div className="hidden w-full sm:flex">
        <Sidebar />
        <main className="flex-1">
          <div className="bg-background text-secondary-foreground">
            <ScrollArea className="h-screen p-4">{children}</ScrollArea>
          </div>
        </main>
      </div>
    </div>
  )
}
