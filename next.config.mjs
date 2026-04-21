import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https://*.elevenlabs.io https://elevenlabs.io https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.elevenlabs.io https://elevenlabs.io blob:; connect-src 'self' https://*.elevenlabs.io https://elevenlabs.io wss://*.elevenlabs.io wss://api.elevenlabs.io blob:; frame-src 'self' https://*.elevenlabs.io https://elevenlabs.io; img-src 'self' data: blob: https://*.elevenlabs.io https://elevenlabs.io https://storage.googleapis.com https://*.googleapis.com; media-src 'self' https://*.elevenlabs.io https://elevenlabs.io https://storage.googleapis.com https://*.googleapis.com blob:; style-src 'self' 'unsafe-inline' https://*.elevenlabs.io https://elevenlabs.io; worker-src 'self' blob:; child-src 'self' blob:;"
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'unsafe-none'
          }
        ],
      }
    ]
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default withNextIntl(nextConfig)
