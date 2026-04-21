export const SITE_CONFIG = {
  domain: 'https://waza.agency',
  name: 'WAZA',
  defaultOgImage: '/og-image.png',
  twitterHandle: '@waboratory',
} as const;

export const DEFAULT_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1 as const,
    'max-image-preview': 'large' as const,
    'max-snippet': -1 as const,
  },
};
