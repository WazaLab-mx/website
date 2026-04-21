import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_CONFIG, DEFAULT_ROBOTS } from './constants';
import { locales, defaultLocale } from '@/i18n/config';

export function generateUrl(path: string, locale: string): string {
  const cleanPath = path === '/' ? '' : path;
  if (locale === defaultLocale) {
    return `${SITE_CONFIG.domain}${cleanPath}`;
  }
  return `${SITE_CONFIG.domain}/${locale}${cleanPath}`;
}

export function generateAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = generateUrl(path, locale);
  }
  return {
    canonical: generateUrl(path, defaultLocale),
    languages,
  };
}

interface PageMetadataParams {
  path: string;
  locale: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export function generatePageMetadata({
  path,
  locale,
  title,
  description,
  keywords,
  ogImage,
}: PageMetadataParams): Metadata {
  const url = generateUrl(path, locale);
  const image = ogImage || SITE_CONFIG.defaultOgImage;
  const isHome = path === '/';
  const fullTitle = isHome ? title : `${title} | ${SITE_CONFIG.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      url,
      siteName: SITE_CONFIG.name,
      locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: SITE_CONFIG.twitterHandle,
    },
    alternates: generateAlternates(path),
    robots: DEFAULT_ROBOTS,
  };
}

type MetadataProps = { params: Promise<{ locale: string }> };

export function createPageMetadataGenerator(
  path: string,
  pageKey: string
) {
  return async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({
      locale,
      namespace: 'metadata.pages',
    });

    return generatePageMetadata({
      path,
      locale,
      title: t(`${pageKey}.title`),
      description: t(`${pageKey}.description`),
      keywords: t(`${pageKey}.keywords`).split(',').map((k: string) => k.trim()),
    });
  };
}

export function createServiceMetadataGenerator(
  slug: string,
  serviceKey: string
) {
  return createPageMetadataGenerator(
    `/services/${slug}`,
    `services_${serviceKey}`
  );
}
