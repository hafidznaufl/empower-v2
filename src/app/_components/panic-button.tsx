/* eslint-disable */
'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import PauseIcon from '~/public/image/pause.svg'
import PlayIcon from '~/public/image/play.svg'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CircleAlert } from 'lucide-react'

let audio: HTMLAudioElement

export default function PanicButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  const scrollUp = useAnimation()
  const dangerAnimation = useAnimation()
  const router = useRouter()
  const pathname = usePathname()

  const playPanicSound = () => {
    if (!audio) {
      audio = new Audio('/audio/code-red.mp3')
      audio.loop = true
    }
    void audio.play()
    setIsPlaying(true)

    void dangerAnimation.start({
      backgroundColor: ['#ff0000', '#ffff00'],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      },
    })
  }

  const stopPanicSound = () => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)

      dangerAnimation.stop()
      void dangerAnimation.start({ backgroundColor: '#ffeb3b' })
    }
  }

  const handleScroll = () => {
    router.push('/')
    stopPanicSound()
  }

  useEffect(() => {
    if (pathname !== '/panic-button') {
      stopPanicSound()
    }
  }, [pathname])

  return (
    <motion.div initial={{ y: 0 }} onWheel={handleScroll} animate={scrollUp}>
      <motion.div
        className="absolute top-0 z-[999] grid min-h-screen w-full place-items-center overflow-hidden bg-white"
        initial={{ y: 0 }}
        animate={dangerAnimation}
      >
        <motion.div
          animate={{ scale: [1, 3], opacity: [1, 0] }}
          transition={{
            delay: 0.2,
            duration: 4,
            ease: 'circOut',
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
          className="absolute mb-40 h-[300px] w-[300px] overflow-y-hidden rounded-full border-2 border-primary md:mb-0"
        ></motion.div>
        <motion.div
          animate={{ scale: [0.8, 2.8], opacity: [1, 0] }}
          transition={{
            delay: 0.5,
            duration: 4,
            ease: 'circOut',
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
          className="absolute mb-40 h-[300px] w-[300px] overflow-y-hidden rounded-full border-4 border-primary md:mb-0"
        ></motion.div>
        <motion.div
          animate={{ scale: [0.6, 2.6], opacity: [1, 0] }}
          transition={{
            delay: 0.7,
            duration: 4,
            ease: 'circOut',
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
          className="absolute mb-40 h-[300px] w-[300px] overflow-y-hidden rounded-full border-8 border-primary md:mb-0"
        ></motion.div>
        <motion.div
          animate={{ scale: [0.4, 2.4], opacity: [1, 0] }}
          transition={{
            delay: 0.9,
            duration: 4,
            ease: 'circOut',
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
          className="absolute mb-40 h-[300px] w-[300px] overflow-y-hidden rounded-full border-[16px] border-primary md:mb-0"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 0.8, 1] }}
          transition={{
            duration: 4,
            ease: 'easeOut',
            repeat: Infinity,
          }}
          className="mb-40 md:mb-0"
        >
          <Button
            variant={'default'}
            className="z-10 h-[300px] w-[300px] rounded-full border-8 border-double border-white bg-primary shadow-xl hover:bg-primary/80"
            onClick={isPlaying ? stopPanicSound : playPanicSound}
          >
            <Image
              src={isPlaying ? PauseIcon : PlayIcon}
              width={120}
              height={120}
              alt={'Exclamation Mark'}
            />
          </Button>
        </motion.div>
        <div className="fixed bottom-6 left-1/2 w-[350px] -translate-x-1/2 rounded-2xl border border-primary/60 bg-primary/20 p-4 text-black shadow-xl backdrop-blur-md transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-center gap-2 text-xl font-semibold">
            <CircleAlert />
            Panic Button
          </div>
          <p className="mt-2 text-center text-sm text-black">
            Use this button if you&apos;re feeling unsafe or being harassed in
            public. It will redirect you back to the app quickly.
          </p>
          <Button
            className="mt-4 w-full py-2 font-bold shadow-lg transition-all"
            onClick={handleScroll}
          >
            Back to App
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
