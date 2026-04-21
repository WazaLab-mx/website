import { SITE_CONFIG } from './constants';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    logo: `${SITE_CONFIG.domain}/images/waza-logo.png`,
    sameAs: [
      'https://twitter.com/waboratory',
      'https://www.linkedin.com/company/waboratory',
      'https://github.com/waboratory',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${SITE_CONFIG.domain}/contact`,
    },
  };
}

export function getWebsiteSchema(locale: string) {
  const url = locale === 'es'
    ? SITE_CONFIG.domain
    : `${SITE_CONFIG.domain}/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/docs?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getServiceSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
    },
  };
}
