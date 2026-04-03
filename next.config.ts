import type { NextConfig } from "next";

/**
 * SECURITY PROTOCOL: Content Security Policy
 * We whitelist Sanity for images and Vercel for analytics.
 */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: cdn.sanity.io;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' https://*.sanity.io https://cdn.sanity.io;
`.replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  // NEXT 16 UNIFIED CACHE
  // Enables PPR (Partial Prerendering) and 'use cache' stable logic
  cacheComponents: true,

  experimental: {
    // Prevents accidental leakage of private Sanity/GH tokens to the client
    taint: true,
  },

  // SECURITY HEADERS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // ASSET OPTIMIZATION
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      }
    ],
  },
};

export default nextConfig;