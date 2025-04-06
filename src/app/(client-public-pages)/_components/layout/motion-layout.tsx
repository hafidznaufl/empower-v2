'use client'

import { motion } from 'framer-motion'

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
          transition: { staggerChildren: 0.5 },
        },
        hidden: { opacity: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({
  children,
}: {
  children: React.ReactNode
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: false, amount: 'some' }}
    >
      {children}
    </motion.div>
  )
}
