'use client'

import { Rubik } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, FilePlus2, ShieldAlert, Siren } from 'lucide-react'
import { AnimatedShinyText } from '~/components/ui/animated-shiny-text'
import { cn } from '~/utils/cn'
import { Button } from '~/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

const rubikFont = Rubik({
  weight: ['500'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Hero() {
  const router = useRouter()

  return (
    <div className="container mx-auto my-20 min-h-[47rem] px-4 md:px-0">
      <div className="grid place-items-center gap-6 pt-16 text-center md:pt-24">
        <div
          className={cn(
            'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
          )}
          onClick={() =>
            router.replace('https://github.com/hafidznaufl/empower-v2')
          }
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-3 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Empower Release v1.0 </span>
            <GitHubLogoIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:rotate-12" />
            <ArrowRightIcon className="ml-2 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </AnimatedShinyText>
        </div>
        <div className={`${rubikFont.className} text-4xl font-bold`}>
          &quot;Your Voice, Your Strength, Our Protection&quot;
        </div>
        <div className="mx-auto max-w-96 text-pretty text-lg text-muted-foreground/60 sm:text-xl md:max-w-[750px]">
          Empower is your trusted ally in the fight against all forms of
          violence—whether sexual, physical, verbal, or bullying. Our platform
          provides a safe space to report incidents, access emergency help, and
          connect with professional support. Together, we build a safe and
          dignified environment where every voice matters.
        </div>
        <div className="mt-2 flex flex-col gap-4 md:flex-row">
          <Button
            variant={'destructive'}
            onClick={() => router.push('/report-incident')}
            className="transform gap-2 transition-transform duration-200 hover:translate-y-0.5"
          >
            <ShieldAlert className="h-4 w-4" />
            Report Incident
          </Button>
          <Button
            variant={'secondary'}
            onClick={() => router.push('/panic-button')}
            className="transform gap-2 transition-transform duration-200 hover:translate-y-0.5"
          >
            <Siren className="h-4 w-4" />
            Panic Button
          </Button>
          <Button
            variant={'default'}
            onClick={() => router.push('/new-blog')}
            className="transform gap-2 transition-transform duration-200 hover:translate-y-0.5"
          >
            <FilePlus2 className="h-4 w-4" />
            Create Blog
          </Button>
        </div>
      </div>
    </div>
  )
}
