import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';

const routes = [
  { path: '/', priority: 1.0 },
  { path: '/about', priority: 0.8 },
  { path: '/agents', priority: 0.8 },
  { path: '/calculator', priority: 0.8 },
  { path: '/chat', priority: 0.7 },
  { path: '/contact', priority: 0.8 },
  { path: '/projects', priority: 0.8 },
  { path: '/services', priority: 0.9 },
  { path: '/services/ai-agents-development', priority: 0.9 },
  { path: '/services/ai-fundamentals-training', priority: 0.9 },
  { path: '/services/ai-web3-integration', priority: 0.9 },
  { path: '/services/ai-web3-integration-training', priority: 0.9 },
  { path: '/services/business-growth-tools', priority: 0.9 },
  { path: '/services/customer-experience', priority: 0.9 },
  { path: '/services/personal-ai-assistants', priority: 0.9 },
  { path: '/services/smart-business-insights', priority: 0.9 },
  { path: '/services/smart-business-solutions', priority: 0.9 },
  { path: '/services/smart-content-creation', priority: 0.9 },
  { path: '/services/smart-work-automation', priority: 0.9 },
  { path: '/services/web3-development', priority: 0.9 },
  { path: '/docs', priority: 0.7 },
  { path: '/docs/ai-agents', priority: 0.7 },
  { path: '/docs/api', priority: 0.7 },
  { path: '/docs/business-solutions', priority: 0.7 },
  { path: '/docs/getting-started', priority: 0.7 },
  { path: '/docs/web3', priority: 0.7 },
];

const domain = 'https://waza.agency';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const prefix = locale === defaultLocale ? '' : `/${locale}`;
      const path = route.path === '/' ? '' : route.path;
      const url = `${domain}${prefix}${path}`;

      const alternates: Record<string, string> = {};
      for (const l of locales) {
        const lPrefix = l === defaultLocale ? '' : `/${l}`;
        alternates[l] = `${domain}${lPrefix}${path}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route.priority,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
