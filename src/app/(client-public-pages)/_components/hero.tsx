'use client'

import { Rubik } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, FilePlus2, ShieldAlert, Siren } from 'lucide-react'
import { AnimatedShinyText } from '~/components/ui/animated-shiny-text'
import { cn } from '~/utils/cn'
import { Button } from '~/components/ui/button'

const rubikFont = Rubik({
  weight: ['500'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Hero() {
  const router = useRouter()

  return (
    <div className="grid place-items-center gap-10 pt-20 text-center md:gap-4 md:pt-36">
      <div
        className={cn(
          'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
        )}
        onClick={() => router.replace('https://github.com/hafidznaufl/empower')}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Empower Beta v1.0</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </AnimatedShinyText>
      </div>
      <div className={`${rubikFont.className} text-4xl font-bold`}>
        "Your Voice, Your Strength, Our Protection"
      </div>
      <div className="mx-auto max-w-[750px] text-pretty text-lg text-muted-foreground sm:text-xl">
        Empower is your trusted ally in the fight against sexual violence. Our
        platform provides a safe space to report incidents, access emergency
        help, and connect with professional support. Empower yourself and
        others—because your safety and voice matter.
      </div>
      <div className="mt-2 flex flex-col gap-4 md:flex-row">
        <Button
          variant={'destructive'}
          onClick={() => router.push('/report-incident')}
          className="gap-2"
        >
          <ShieldAlert className="h-4 w-4" />
          Report Incident
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => router.push('panic-button')}
          className="gap-2"
        >
          <Siren className="h-4 w-4" />
          Panic Button
        </Button>
        <Button
          variant={'default'}
          onClick={() => router.push('/new-blog')}
          className="gap-2"
        >
          <FilePlus2 className="h-4 w-4" />
          Make a New Blog
        </Button>
      </div>
    </div>
  )
}
