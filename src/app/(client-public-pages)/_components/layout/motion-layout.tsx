'use client'

import { motion } from 'motion/react'

interface MotionLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MotionLayout({ children, className }: MotionLayoutProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 'some' }}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'backOut' },
        },
        hidden: { opacity: 0, y: 100 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
