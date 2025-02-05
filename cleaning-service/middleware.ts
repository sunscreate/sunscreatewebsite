import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = request.headers.get("host")
  const isProd = process.env.NODE_ENV === "production"

  // If www, redirect to non-www
  if (hostname?.startsWith("www.")) {
    const newHost = hostname.replace("www.", "")
    return NextResponse.redirect(`https://${newHost}${request.nextUrl.pathname}`, 301)
  }

  // Clone the response headers
  const response = NextResponse.next()

  // Add security headers
  const headers = response.headers

  // HSTS
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")

  // XSS Protection
  headers.set("X-XSS-Protection", "1; mode=block")

  // Content Security Policy
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:;",
  )

  // Prevent clickjacking
  headers.set("X-Frame-Options", "DENY")

  // Disable MIME type sniffing
  headers.set("X-Content-Type-Options", "nosniff")

  // Referrer Policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Permissions Policy
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()")

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}

