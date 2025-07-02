// middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { token } = req.nextauth
    // Redirect admins or staff trying to access customer account area
    if (token?.role !== 'customer' && req.nextUrl.pathname.startsWith('/account')) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // !!token ensures a boolean is returned
    },
  },
)

// See "Matching Paths" below to learn more
export const config = {
  // CORRECTED: Use a path matcher to protect the entire checkout flow, not just the base URL.
  matcher: ['/account/:path*', '/checkout/:path*'],
}
