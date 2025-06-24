"use client"
import React from "react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-limestone text-charcoal">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="px-6 py-2 rounded bg-sage text-white hover:bg-deep-sage transition">Go Home</a>
    </div>
  )
}
