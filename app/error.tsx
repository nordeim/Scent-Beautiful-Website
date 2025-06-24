"use client"
import React from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-limestone text-charcoal">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6">{error.message || "An unexpected error occurred."}</p>
      <button
        className="px-6 py-2 rounded bg-sage text-white hover:bg-deep-sage transition"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  )
}
