// components/features/home/HeroSection.tsx
'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

export function HeroSection() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="container relative z-20 flex flex-col items-center justify-center text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-heading"
        >
          A Digital Sanctuary for the Senses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 max-w-xl text-lg text-white/80"
        >
          Explore our collection of premium, natural aromatherapy products designed to
          transform your space and elevate your well-being.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="px-8 py-6 text-base">
            <Link href="/products">Explore The Collection</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-base bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link href="/journal">Read Our Journal</Link>
          </Button>
        </motion.div>
      </div>

      <button
        onClick={toggleMute}
        className="absolute top-24 right-4 md:right-8 z-20 p-2 rounded-full text-white bg-black/30 hover:bg-black/50 transition-colors"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </section>
  )
}
