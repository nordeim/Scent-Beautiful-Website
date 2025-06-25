'use client'

import { useTheme } from '@/components/providers/ThemeProvider'
import Image from 'next/image'

export default function Home() {
  const { toggleTheme, theme } = useTheme()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to The Scent
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium h-12 px-5"
          >
            Toggle to {theme === 'day' ? 'Night' : 'Day'} Mode
          </button>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center ">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>A luxury aromatherapy experience is coming soon.</p>
      </footer>
    </main>
  )
}
