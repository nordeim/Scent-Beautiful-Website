import { NextResponse } from 'next/server'

export async function POST() {
  // TODO: Stripe webhook logic
  return NextResponse.json({ received: true })
}
