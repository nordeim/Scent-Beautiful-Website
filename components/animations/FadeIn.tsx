// components/animations/FadeIn.tsx
'use client'

import { motion, Variants } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
  yOffset?: number
}

export function FadeIn({ children, duration = 0.6, delay = 0, className, yOffset = 20 }: FadeInProps) {
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
