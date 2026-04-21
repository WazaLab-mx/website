import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const typedLocale = locale as Locale;

  return {
    locale: typedLocale,
    messages: {
      ...(await import(`../messages/${typedLocale}/common.json`)).default,
      ...(await import(`../messages/${typedLocale}/home.json`)).default,
      ...(await import(`../messages/${typedLocale}/about.json`)).default,
      ...(await import(`../messages/${typedLocale}/contact.json`)).default,
      ...(await import(`../messages/${typedLocale}/services.json`)).default,
      ...(await import(`../messages/${typedLocale}/projects.json`)).default,
      ...(await import(`../messages/${typedLocale}/calculator.json`)).default,
      ...(await import(`../messages/${typedLocale}/docs.json`)).default,
      ...(await import(`../messages/${typedLocale}/chat.json`)).default,
      ...(await import(`../messages/${typedLocale}/serviceDetails.json`)).default,
      ...(await import(`../messages/${typedLocale}/agents.json`)).default,
      ...(await import(`../messages/${typedLocale}/metadata.json`)).default,
    },
  };
});
