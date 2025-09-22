'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

interface MotionLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MotionLayout({ children, className }: MotionLayoutProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
